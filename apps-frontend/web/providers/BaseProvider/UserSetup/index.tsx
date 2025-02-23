import { isTrack } from '~utils';

import UserAnalytics from './UserAnalytics';
import UserAuth from './UserAuth';
import UserClean from './UserClean';
// import UserLiveChat from './UserLiveChat';
import UserNotif from './UserNotif';
import UserSocket from './UserSocket';
// import UserTheme from './UserTheme';

function UserSetup() {
  return (
    <>
      <UserAuth />
      <UserSocket />
      {isTrack && <UserAnalytics />}
      <UserNotif />
      {/* <UserTheme /> */}
      {/* <UserLiveChat /> */}
      <UserClean />
    </>
  );
}

export default UserSetup;
