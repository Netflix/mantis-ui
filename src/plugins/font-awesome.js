import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleLeft,
  faArrowDown,
  faArrowsAltH,
  faBolt,
  faClipboard,
  faClock,
  faCog,
  faRocket,
  faSitemap,
  faSlidersH,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default () => {
  library.add(
    faRocket,
    faSitemap,
    faClock,
    faBolt,
    faCog,
    faArrowsAltH,
    faArrowDown,
    faAngleLeft,
    faClipboard,
    faSlidersH,
  );
  Vue.component('FontAwesomeIcon', FontAwesomeIcon);
}

