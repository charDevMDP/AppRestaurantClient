import { StyleSheet } from 'react-native'

const globalStyles = StyleSheet.create({
  container:{
    flex: 1,
  },
  contents:{
    marginHorizontal: '2,5%',
    flex: 1
  },
  button:{
    backgroundColor: 'green'
  },
  btnText:{
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize:15,
    color: '#fff'
  },
  title: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 30
  },
  imgDetails:{
    width: '100%',
    height: 300
  },
  price:{
    marginVertical: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  count:{
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 30

  }
})

export default globalStyles;