import { useRouter } from 'next/router';

import { watchUserInfoController } from '~controllers/user.controller';
import Stack from '~ui/core/Stack';
import Tabs from '~ui/core/Tabs';
import Title from '~ui/core/Title';

import Disqus from './Disqus';
import Giscus from './Giscus';

function Discussion() {
  const router = useRouter();

  const {
    providerId = '',
    name = '',
  } = watchUserInfoController((state) => ({
    providerId: state.activeAccount?._id,
    name: state.activeAccount?.name,
  }));

  return (
    <Stack id="discussion">
      <Title size="h3">💬 Comments</Title>
      <Tabs defaultValue="disqus">
        <Tabs.List>
          <Tabs.Tab value="disqus">
            <Title size="h4">Disqus</Title>
          </Tabs.Tab>
          <Tabs.Tab value="giscus">
            <Title size="h4">Giscus</Title>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="disqus" pt="md">
          <Disqus
            url={`https://www.fishprovider.com${router.asPath}`}
            id={providerId}
            title={name}
          />
        </Tabs.Panel>
        <Tabs.Panel value="giscus" pt="md">
          <Giscus />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}

export default Discussion;
