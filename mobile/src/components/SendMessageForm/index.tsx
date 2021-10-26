import React, { useState } from 'react'

import { TextInput, View } from 'react-native'
import { COLORS } from '../../theme'
import { Button } from '../Button'

import { styles } from './styles'

export function SendMessageForm() {
    const [message, setMessage] = useState('')
    const [sendingMessage, setSendingMessage] = useState(false)
    return (
        <View style={styles.container}>
            <TextInput
                editable={!sendingMessage}
                onChangeText={setMessage}
                value={message}
                multiline
                maxLength={140}
                keyboardAppearance="dark"
                placeholder="Qual a sua expectativa para o evento?"
                placeholderTextColor={COLORS.GRAY_PRIMARY}
                style={styles.input}
            />

            <Button
                title="ENVIAR MENSAGEM"
                backgroundColor={COLORS.PINK}
                color={COLORS.WHITE}
            />
        </View>
    )
}
