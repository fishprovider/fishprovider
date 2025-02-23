import { Account } from '@fishprovider/core';
import _ from 'lodash';
import moment from 'moment';

import InvestNow from '~components/account/InvestNow';
import Link from '~components/base/Link';
import { watchAccountController } from '~controllers/account.controller';
import { toStrategy } from '~libs/routes';
import Badge from '~ui/core/Badge';
import Box from '~ui/core/Box';
import Card from '~ui/core/Card';
import Group from '~ui/core/Group';
import Loader from '~ui/core/Loader';
import Stack from '~ui/core/Stack';
import Text from '~ui/core/Text';
import Title from '~ui/core/Title';
import { getRiskScoreColor, getRiskScoreText } from '~utils/account';

const defaultTopProviders: Record<string, Partial<Account>> = {
  earth: {
    name: 'Earth',
    icon: '🍀',
    riskScore: 1,
    winRate: 90,
    monthProfit: 2,
    roi: 48.25,
    createdAt: new Date('2022-12-01T10:00:00.000+1000'),
  },
  water: {
    name: 'Water',
    icon: '🌊',
    riskScore: 2,
    winRate: 80,
    monthProfit: 4,
    roi: 95.61,
    createdAt: new Date('2022-10-01T10:00:00.000+1000'),
  },
};

interface Props {
  providerId: string,
}

function ProviderCardTop({ providerId }: Props) {
  const account = watchAccountController((state) => state[providerId]);
  const {
    name,
    icon,
    createdAt,
    riskScore,
    winRate,
    monthProfit = 0,
    roi = 0,
    summary = {},
  } = account || defaultTopProviders[providerId] || {};

  const totalProfit = summary?.roi || roi || 0;
  const activeMonths = moment().diff(moment(createdAt), 'months');
  const avgProfit = totalProfit / activeMonths;

  return (
    <Link href={toStrategy(providerId)} variant="clean">
      <Card withBorder shadow="xl" miw={280} ta="center">
        <Stack>
          <Group position="center">
            <Badge color={getRiskScoreColor(riskScore)} variant="filled">
              {getRiskScoreText(riskScore)}
            </Badge>
            {winRate && (
              <Badge color="blue" variant="filled">
                Win Rate
                {' '}
                {winRate}
                %
              </Badge>
            )}
          </Group>
          <Title size="h3">{name || <Loader variant="dots" />}</Title>
          <Title size="h2">{icon || <Loader variant="bars" size="sm" />}</Title>
          <Box>
            <Text>
              Target:
              {' '}
              <Text fw={700} span c="orange">{`${monthProfit}%/month`}</Text>
            </Text>
            <Text>
              Total Profit:
              {' '}
              <Text fw={700} span c="green">{`${totalProfit}%`}</Text>
            </Text>
            <Text>
              Active:
              {' '}
              <Text fw={700} span c="blue">
                {activeMonths}
                {' '}
                months
              </Text>
            </Text>
            <Text>
              Avg. Profit:
              {' '}
              <Text fw={700} span c="grape">{`${_.round(avgProfit, 2)}%/month`}</Text>
            </Text>
          </Box>
          <InvestNow providerId={providerId} />
        </Stack>
      </Card>
    </Link>
  );
}

export default ProviderCardTop;
