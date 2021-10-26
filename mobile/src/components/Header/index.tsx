import React from 'react'

import { View, Text, TouchableOpacity } from 'react-native'
import { UserPhoto } from '../../components/UserPhoto'

import { styles } from './styles'

import LogoSvg from '../../assets/logo.svg'

export function Header() {
    return (
        <View style={styles.container}>
            <LogoSvg />
            <View style={styles.logoutButton}>
                <TouchableOpacity>
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>

                <UserPhoto imageUri="http://github.com/Nandosbx.png" />
            </View>
        </View>
    )
}
