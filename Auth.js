import React, {Component} from 'react';
import Auth0 from 'react-native-auth0';
import {Button, View, TextInput, Modal, Text, Image} from 'react-native';

const auth0 = new Auth0({
  domain: 'uhu',
  clientId: 'uhu',
});

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      phone: '',
      code: '',
      codeRequestSent: false,
      LogginIn: false,
      isLoggedin: false,
      image: '',
      accessToken: '',
      idToken: '',
    };
    this.loginUser = this.loginUser.bind(this);
    this.getLoginCode = this.getLoginCode.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  getLoginCode() {
    this.setState({LogginIn: true});
    auth0.auth
      .passwordlessWithSMS({
        phoneNumber: this.state.phone,
      })
      .then(() => {
        this.setState({codeRequestSent: true});
      })
      .catch(console.error);
  }

  loginUser() {
    auth0.auth
      .loginWithSMS({
        phoneNumber: this.state.phone,
        code: this.state.code,
      })
      .then(response => {
        console.log(response);
        this.setState({
          image: response.picture,
          accessToken: response.accessToken,
          idToken: response.idToken,
          isLoggedin: true,
        });
      })
      .catch(console.error);
  }

  logoutUser() {
    //To logout, just clear the access tokens
    this.setState({
      accessToken: '',
      idToken: '',
      isLoggedin: false,
      LogginIn: false,
      codeRequestSent: false
    });
  }

  render() {
    const {
      codeRequestSent,
      LogginIn,
      code,
      isLoggedin,
      accessToken,
      idToken,
    } = this.state;
    return (
      <View>
        {!codeRequestSent ? (
          <>
            <TextInput
              style={{
                borderColor: 'blue',
                borderWidth: 1,
                borderRadius: 5,
                height: 40,
                padding: 10,
              }}
              placeholder="Coloque seu telefone:"
              onChangeText={text => this.setState({phone: text})}
            />
            <Button
              style={{padding: 10, marginBottom: 5}}
              title={LogginIn ? 'Processando...' : 'Pegar código'}
              onPress={this.getLoginCode}
            />
          </>
        ) : (
          <>
            <TextInput
              style={{
                borderColor: 'blue',
                borderWidth: 1,
                borderRadius: 5,
                height: 40,
                padding: 10,
                marginBottom: 5,
                marginTop: 30,
              }}
              placeholder="Entre com o Código"
              value={code}
              onChangeText={text => this.setState({code: text})}
            />
            <Button title="Login" onPress={this.loginUser} />

            <View style={{flex: 1}}>
              <Modal transparent={true} visible={isLoggedin}>
                <View style={{backgroundColor: '#000000aa', flex: 1}}>
                  <View
                    style={{
                      backgroundColor: '#ffffff',
                      margin: 50,
                      padding: 40,
                      borderRadius: 10,
                    }}>
                    <Text> Parabéns! Você entrou no Jinboo! 👍🏼🎉 {'\n'}</Text>

                    <Text> Here are your details:{'\n'}</Text>
                    <Text>
                      AccessToken: {' ' + accessToken}
                      {'\n'}
                    </Text>
                    <Text>
                      IDToken:
                      {' ' + idToken.length > 200
                        ? `${idToken.substring(0, 200)}...`
                        : idToken}
                      {'\n'}
                    </Text>

                    <Button title="Logout" onPress={this.logoutUser} />


                  </View>
                </View>
              </Modal>
            </View>
          </>
        )}
      </View>
    );
  }
}

export default Auth;
