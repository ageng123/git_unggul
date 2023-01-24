import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,List } from 'react-native';
import { connect } from 'react-redux';
const data = new Array(8).fill({
  title: 'Item',
  description: 'Description for Item',
});
export function PenjualIndex(props){
  return (
    <List 
        style={styles.containerList}
        data={data}
    />
  );
}
export const FormPenjualContainer = connect(state => ({modelPelanggan: state.modelPelanggan}))(PenjualIndex);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerList: {
    maxHeight: 1000
  },
});
