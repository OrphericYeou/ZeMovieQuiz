import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar, Alert, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import Button from '../Utils/Button'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, actionCreators as actions } from '../Store/actions'
import * as API from '../http';


function formatTime(time) {
    let minutes = Math.floor(time / 60)
    time -= minutes * 60;
    let seconds = parseInt(time % 60, 10);
    return `${minutes < 10 ? `0${minutes
            }` :
            minutes
        }:${seconds < 10 ? `0${seconds
            }` :
            seconds
        } `
}


class StartGameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            films:null
        }
    }

    componentWillReceiveProps(nextProps) {
        const currentProps = this.props;
        if (!currentProps.isPlaying && nextProps.isPlaying) {
            const timerInterval = setInterval(() => {
                currentProps.addSecond();
            }, 1000);
            this.setState({ timerInterval });
        }
        else if (currentProps.isPlaying && !nextProps.isPlaying) {
            clearInterval(this.state.timerInterval);
        }
    }

    async componentDidMount(nextProps){
        const currentProps = this.props;
        if(!currentProps.films && nextProps.films){
            currentProps.getFilms();
        }

        this.getData()
    }

    async getData(){
        let films = []
        await API.getListFilm().then(async response => {
            if (response.success) {
                console.log(response.success)
            }
            else {
                //console.log(response.items)
                for (let i = 0; i < response.items.length; i++) {
                    //console.log(i)
                    await API.getMovieDetails(response.items[i].id).then(async res => {
                        if (res.success) {
                            console.log(res.success)
                        }
                        else {
                            let film = {
                                id: response.items[i].id,
                                title: response.items[i].title,
                                image: response.items[i].poster_path,
                                name: res.cast[0].name
                            }
                            films.push(film)
                        }
                    })

                }

            }
        })

        this.setState({
            films:films
        })
    }


    render() {
        const {
            isPlaying,
            elapsedTime,
            timerDuration,
            startTimer,
            restartTimer,
        } = this.props
        console.log(this.state.films)

        if(!this.state.films){
            return(
                <ActivityIndicator style={{flex:1}} size={80} color="gray" />
            )
        }

        return (
            <View style={styles.container}>
                <StatusBar barStyle={"light-content"} />
                <View style={styles.upper}>
                    <Text style={{fontSize:35, color:"#fff"}}>Temps Restant</Text>
                    <Text style={styles.time}>
                        {formatTime(timerDuration - elapsedTime)}
                    </Text>
                   {/*  {this.state.films.map((film, index)=>( */}
                        <View>
                            {/* <Text style={{ color: "#fff", fontWeight: "bold" }}> {film.id}</Text> */}
                            <Image
                                style={styles.tinyLogo}
                                source={{ uri: `https://image.tmdb.org/t/p/w500${this.state.films[0].image}` }}
                            />
                        </View>
                    {/* ))} */}
                    <Text style={styles.time}>
                        {formatTime(timerDuration - elapsedTime)}
                    </Text>
                </View>
                
                <View style={styles.lower}>
                    {!isPlaying && (<Button
                        iconName="play-circle"
                        onPress={startTimer}
                    />)}

                    {isPlaying && (<Button
                        iconName="stop-circle"
                        onPress={restartTimer}
                    />)}
                </View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop:150
    },

    upper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    lower: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    time: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "100"
    },
    tinyLogo: {
        width:200,
        height: 350,
    },
});


function mapStateToProps(state) {
    const { isPlaying, elapsedTime, timerDuration, films } = state;
    return {
        isPlaying,
        elapsedTime,
        timerDuration,
        films
    }
}

function mapDispatchToProps(dispatch) {
    return {
        startTimer: bindActionCreators(actions.startTimer, dispatch),
        restartTimer: bindActionCreators(actions.restartTimer, dispatch),
        addSecond: bindActionCreators(actions.addSecond, dispatch),
        getFilms: bindActionCreators(actions.getFilms   , dispatch),
        
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StartGameScreen);