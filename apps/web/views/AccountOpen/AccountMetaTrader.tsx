import accountAdd from '@fishbot/cross/api/accounts/add';
import { useMutate } from '@fishbot/cross/libs/query';
import { ProviderPlatform, ProviderTradeType, ProviderType } from '@fishbot/utils/constants/account';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Routes from '~libs/routes';
import Button from '~ui/core/Button';
import Group from '~ui/core/Group';
import Radio from '~ui/core/Radio';
import Stack from '~ui/core/Stack';
import TextInput from '~ui/core/TextInput';
import { toastError, toastSuccess } from '~ui/toast';
import { isLive } from '~utils';

interface Props {
  providerType: ProviderType,
}

function AccountMetaTrader({ providerType }: Props) {
  const router = useRouter();

  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [platform, setPlatform] = useState('mt4');
  const [server, setServer] = useState('');

  const { mutate: add, isLoading } = useMutate({
    mutationFn: accountAdd,
  });

  const onNew = () => {
    const accountToNew = {
      name,
      providerType,
      providerPlatform: ProviderPlatform.metatrader,
      providerTradeType: isLive ? ProviderTradeType.live : ProviderTradeType.demo,
      config: {
        clientId: '',
        clientSecret: '',
        user,
        pass,
        platform,
        server,
      },
    };

    add({ accountToNew }, {
      onSuccess: () => {
        toastSuccess('Done');
        router.push(Routes.accounts);
      },
      onError: (err) => toastError(`${err}`),
    });
  };

  return (
    <Stack>
      <Group>
        <Radio
          checked={platform === 'mt4'}
          onChange={() => setPlatform('mt4')}
          label="MT4"
        />
        <Radio
          checked={platform === 'mt5'}
          onChange={() => setPlatform('mt5')}
          label="MT5"
        />
      </Group>
      <TextInput
        value={user}
        onChange={(event) => {
          setUser(event.target.value);
          setName(event.target.value);
        }}
        label="Login"
        placeholder="11804543"
      />
      <TextInput
        value={pass}
        onChange={(event) => setPass(event.target.value)}
        label="Password"
        placeholder="123456"
        type="password"
      />
      <TextInput
        value={server}
        onChange={(event) => setServer(event.target.value)}
        label="Server"
        placeholder="Exness-Real, RoboForex-Prime, ..."
      />
      <TextInput
        value={name}
        onChange={(event) => setName(event.target.value)}
        label="Nickname"
        placeholder="My Pet"
      />
      <Button onClick={onNew} loading={isLoading}>
        Create account
      </Button>
    </Stack>
  );
}

export default AccountMetaTrader;
