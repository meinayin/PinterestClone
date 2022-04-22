import pins from '../assets/data/pins';
import MasonryList from '../components/MasonryList';

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <MasonryList pins={pins}/>
  );
}


