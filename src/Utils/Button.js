import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import {FontAwesome} from '@expo/vector-icons' 

const Button = ({iconName, onPress}) => {
    return (
        <TouchableOpacity onPressOut={onPress}>
            <FontAwesome name={iconName} size={80} color='#fff'/> 
        </TouchableOpacity>
    )
}

Button.propTypes = {
    iconName:PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
}

export default Button

const styles = StyleSheet.create({})
