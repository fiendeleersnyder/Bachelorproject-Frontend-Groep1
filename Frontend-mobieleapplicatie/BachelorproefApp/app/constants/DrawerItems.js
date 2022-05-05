import { AntDesign } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

<AntDesign name="home" size={24} color="black" />
<AntDesign name="book" size={24} color="black" />
<Entypo name="export" size={24} color="black" />

export default [
    {
        name:'Home', 
        iconType:'@expo/vector-icons',
        iconName:'home'
    }
    {
        name:'Subjects', 
        iconType:'@expo/vector-icons',
        iconName:'book'
    }
    {
        name:'Submit', 
        iconType:'@expo/vector-icons',
        iconName:'export'
    }
]