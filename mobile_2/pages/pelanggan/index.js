import { StatusBar } from 'expo-status-bar';
import { StyleSheet, RefreshControl, ScrollView,Alert } from 'react-native';
import { Divider, List,Button,Layout,Text } from '@ui-kitten/components';
import ListItemHelper from '../../components/list_item';
import React from 'react';
import { PelangganService } from '../../services/pelanggan_service';
import { AppProperties } from '../../config/config';
const data = new Array(8).fill({
  title: 'Item',
  description: 'Description for Item',
});
import { useIsFocused } from "@react-navigation/native";

export default function PelangganIndex(props) {
  const[refreshing, setRefresh] = React.useState(false);
  const [viewData, setViewData] = React.useState(data);
  const isFocused = useIsFocused();

  const handleRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      fetchData();
    }, 1000)
  }
  const handleAddButton = () => {
    props.navigation.navigate(AppProperties.application_name + " - Form Pelanggan")
  }
  React.useEffect(() => {
    fetchData();
    props.navigation.setOptions({
      headerRight: () => (
        <Button style={styles.buttonHeader} onPress={handleAddButton} title="Add" status="primary" appeareance="ghost">Add</Button>
      )
    })
  }, [isFocused]);
  const handleDelete = ({id_pelanggan, nama}) => {
    let confirmed = false;
    
    Alert.alert(
        "Confirmation",
        'Are you sure you want to delete data : '+nama+" ?",
        [
          {text: "Yes", onPress: () => {
            PelangganService.delete(id_pelanggan).then(resp => {
              alert(resp.data.messages);
              fetchData();
            })
          }},
          {text: "No", onPress: () => {return setConfirmed(false)}}]
        );
        const setConfirmed = (props) => {
          confirmed = props;
        }
      
  }
  const handleEdit = ({id_pelanggan}) => {
    props.navigation.navigate(AppProperties.application_name+" - Form Pelanggan", {uuid: id_pelanggan})
  }
  const render = {
    getDescription: (props) => (
        <>
          <Text>ID : {props.id_pelanggan}</Text>
          <Text>Jenis Kelamin : {props.jenis_kelamin}</Text>
          <Text>Domisili : {props.domisili}</Text>
        </>
      ),
    
    accessoryRight: (props,value) =>{
      return (
        <Layout level="1">
          <Button title="edit" onPress={() => handleEdit(value)} status="success" name="Edit">Edit</Button>
          <Button name="Edit" onPress={() => handleDelete(value)}  status="danger">Hapus</Button>
        </Layout>
      );
    }
  }
  const fetchData = async () => {
    setRefresh(true);
    
    console.log("hit here");
    await PelangganService.getAll({q: ""}).then(resp => {
      let viewDataTmp = [];
      resp.data.data.map((value) => {
        let itemViewData = {id: "", title: value.nama, description: render.getDescription(value), accessoryRight: (props => render.accessoryRight(props, value)),};
        viewDataTmp.push(itemViewData);
      });
      setViewData(viewDataTmp)
    }, resp => {
      console.warn("error : "+JSON.stringify(resp));
    })
    setRefresh(false);

  }
  return (
    <List
      style={styles.containerList}
      data={viewData}
      ItemSeparatorComponent={Divider}
      renderItem={ListItemHelper}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    />
  );
}

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
  buttonHeader: {
    marginRight: 15
  }
});
