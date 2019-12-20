import { ReactComponent as clearDay } from './Sun.svg';
import { ReactComponent as clearNight } from './Moon.svg';
import { ReactComponent as rain } from './Cloud-Rain.svg';
import { ReactComponent as snow } from './Cloud-Snow.svg';
import { ReactComponent as hail } from './Cloud-Hail.svg';
import { ReactComponent as wind } from './Wind.svg';
import { ReactComponent as fog } from './Fog.svg';
import { ReactComponent as cloudy } from './Cloud.svg';
import { ReactComponent as partlyCloudyDay } from './Cloud-Sun.svg';
import { ReactComponent as partlyCloudyNight } from './Cloud-Moon.svg';
import { ReactComponent as thunderstorm } from './Cloud-Lightning.svg';
import { ReactComponent as tornado } from './Tornado.svg';

export default {
  'clear-day': clearDay,
  'clear-night': clearNight,
  'partly-cloudy-day': partlyCloudyDay,
  'partly-cloudy-night': partlyCloudyNight,
  cloudy,
  fog,
  hail,
  rain,
  sleet: hail,
  snow,
  thunderstorm,
  tornado,
  wind,
};
