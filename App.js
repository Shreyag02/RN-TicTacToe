import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {NativeBaseProvider, Text, Button, Box, Flex} from 'native-base';

import Icons from './components/Icons';
import Snackbar from 'react-native-snackbar';

const game = require('./assets/game.png');
const itemArray = new Array(9).fill('empty');

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState('');

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage('');
    itemArray.fill('empty', 0, 9);
  };

  const checkIsWinner = () => {
    for (var i = 0; i < 9; i += 3) {
      if (
        itemArray[i] === itemArray[i + 1] &&
        itemArray[i] === itemArray[i + 2] &&
        itemArray[i] !== 'empty'
      ) {
        setWinMessage(`${itemArray[i]} wins`);
      }
    }

    for (i = 0; i < 3; i++) {
      if (
        itemArray[i] === itemArray[i + 3] &&
        itemArray[i] === itemArray[i + 6] &&
        itemArray[i] !== 'empty'
      ) {
        setWinMessage(`${itemArray[i]} wins`);
      }
    }
    if (
      itemArray[0] === itemArray[4] &&
      itemArray[0] === itemArray[8] &&
      itemArray[0] !== 'empty'
    ) {
      setWinMessage(`${itemArray[0]} wins`);
    }

    if (
      itemArray[2] === itemArray[4] &&
      itemArray[2] === itemArray[6] &&
      itemArray[2] !== 'empty'
    ) {
      setWinMessage(`${itemArray[2]} wins`);
    }
  };

  const changeItem = itemNumber => {
    if (winMessage) {
      return Snackbar.show({
        text: winMessage,
        backgroundColor: '#000',
        textColor: '#FFF',
      });
    }

    if (itemArray[itemNumber] === 'empty') {
      itemArray[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        color: '#FFF',
      });
    }

    checkIsWinner();
  };

  return (
    <NativeBaseProvider>
      <Text style={styles.message} fontSize="xl">
        TIC TAC TOE
      </Text>
      <Box flex="1" safeAreaTop justifyContent="center" bg="indigo.200">
        <Image source={game} style={styles.gameImg} />
        <Flex
          alignItems="center"
          justifyContent="space-evenly"
          flexWrap="wrap"
          flexDirection="row"
          alignSelf="center">
          {itemArray.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => changeItem(index)}
              style={styles.box}>
              <Box justifyContent="center" alignItems="center" h={24}>
                <Icons name={item} />
              </Box>
            </TouchableOpacity>
          ))}
        </Flex>
      </Box>

      {winMessage ? (
        <Box
          bg="indigo.200"
          alignItems="center"
          p="1"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly">
          <Text p="5" style={styles.message}>
            {winMessage}
          </Text>
          <Button onPress={reloadGame} colorScheme="secondary" my="2" p="5">
            Reload Game
          </Button>
        </Box>
      ) : (
        <Text style={styles.message}>{isCross ? 'Cross' : 'Circle'} turns</Text>
      )}
    </NativeBaseProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  box: {
    width: '30%',
    marginBottom: 6,
    borderWidth: 2,
    borderColor: '#4652B3',
  },

  message: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
    backgroundColor: '#4652B3',
    paddingVertical: 10,
  },
  gameImg: {
    height: 200,
    width: 300,
    alignSelf: 'center',
    margin: 40,
  },
});
