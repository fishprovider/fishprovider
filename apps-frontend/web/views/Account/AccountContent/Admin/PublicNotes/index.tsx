import storeUser from '@fishprovider/cross/dist/stores/user';

import AccountHtmlEditor from '~components/account/AccountHtmlEditor';
import { updateAccountService } from '~services/account/updateAccount.service';

function PublicNotes() {
  const notes = storeUser.useStore((state) => state.activeProvider?.notes);

  const onSave = async (content?: string) => {
    const accountId = storeUser.getState().activeProvider?._id || '';

    updateAccountService({
      accountId,
    }, {
      notes: content,
    });
  };

  return (
    <AccountHtmlEditor
      title="📝 Public Notes"
      content={notes}
      onSave={onSave}
    />
  );
}

export default PublicNotes;
