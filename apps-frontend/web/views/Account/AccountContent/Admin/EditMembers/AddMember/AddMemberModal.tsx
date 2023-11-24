import membersAdd from '@fishprovider/cross/dist/api/accounts/members/add';
import { Roles } from '@fishprovider/utils/dist/constants/user';
import { useState } from 'react';

import { ProviderRoleText } from '~constants/account';
import { watchUserInfoController } from '~controllers/user.controller';
import Button from '~ui/core/Button';
import Group from '~ui/core/Group';
import Select from '~ui/core/Select';
import Stack from '~ui/core/Stack';
import TextInput from '~ui/core/TextInput';
import openConfirmModal from '~ui/modals/openConfirmModal';

interface Props {
  onClose?: () => void;
}

function AddMemberModal({ onClose }: Props) {
  const {
    providerId = '',
  } = watchUserInfoController((state) => ({
    providerId: state.activeAccount?._id,
  }));

  const [email, setEmail] = useState('');
  const [role, setRole] = useState(Roles.viewer);

  const onSave = async () => {
    if (!(await openConfirmModal())) return;

    await membersAdd({
      providerId,
      email,
      role,
    }).then(() => {
      if (onClose) onClose();
    });
  };

  const renderContent = () => (
    <>
      <TextInput
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        label="Email"
      />
      <Select
        value={role}
        onChange={(value) => {
          if (!value) return;
          setRole(value as Roles);
        }}
        label="Role"
        data={Object.keys(Roles).map((item) => ({
          value: item,
          label: ProviderRoleText[item]?.text,
        }))}
        description={`${ProviderRoleText[role]?.text}: ${ProviderRoleText[role]?.description}`}
      />
    </>
  );

  return (
    <Stack>
      {renderContent()}
      <Group position="right">
        <Button onClick={onSave}>Save</Button>
        <Button onClick={onClose} variant="subtle">Close</Button>
      </Group>
    </Stack>
  );
}

export default AddMemberModal;
