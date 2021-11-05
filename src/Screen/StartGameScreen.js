import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar, Alert, TouchableOpacity, ActivityIndicator } from 'react-native'
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
            films:[]
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

    componentDidMount(nextProps){
        const currentProps = this.props;
        if(!currentProps.films && nextProps.films){
            currentProps.getFilms();
        }
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
            films
        } = this.props
        console.log(films)

        if(!this.state.films){
            <ActivityIndicator size="large" color="#00ff00" />
        }

        return (
            <View style={styles.container}>
                <StatusBar barStyle={"light-content"} />
                <View style={styles.upper}>
                    <Text style={styles.time}>
                        {formatTime(timerDuration - elapsedTime)}
                    </Text>
                    <Text>{films}</Text>
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
        fontSize: 120,
        fontWeight: "100"
    }
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