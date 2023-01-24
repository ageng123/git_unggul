import { StyleSheet,  View } from 'react-native';
import { Icon, ListItem,Text,Button, Layout,ButtonGroup } from '@ui-kitten/components';
import { AppProperties } from '../config/config';
export default function ListItemHelper(props) {
  return (
      
      <ListItem 
        {...props.item}
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
});
