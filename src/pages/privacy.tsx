import ContentBlock from '@stakk/components/ContentBlock';
import PageLayout from '@stakk/components/PageLayout';

function Privacy() {
  return (
    <PageLayout title='privacy'>
      <ContentBlock title='Privacy notice'>
        <p>
        We (stakk) do not collect any personalised information on this site.<br />
        </p>
      </ContentBlock>
      <ContentBlock title='Mixcloud' titleTag='h3' titleSize='sm'>
        <p>
        On our website we use the Mixcloud widget by Mixcloud Limited, 96 Leonard Street, London, EC2A 4RH, UK.<br />
        </p>
        <p>
        If you press <em>Play</em> for an item, a connection to the Mixcloud servers is established. Here the Mixcloud server is informed about which of our pages you have visited.
        </p>
        <p>
        If you are a registered user of Mixcloud they can connect your usage of our website with your profile.
        </p>
        <p>
        Below you can find a link to the privacy policies of Mixcloud Limited.<br />
        </p>
        <p>
        Privacy policy: <a href='https://www.mixcloud.com/privacy/' target='_blank' rel='noreferrer nofollow'>https://www.mixcloud.com/privacy/</a>
        </p>
      </ContentBlock>
    </PageLayout>
  );
}

export default Privacy;

