import ContentBlock from '../components/ContentBlock';
import PageLayout from '../components/PageLayout';

function About() {
  return (
    <PageLayout title='about'>
      <ContentBlock title='About'>
        <p><em>stakk</em> is a tool for sharing digital media in a more tactile form.</p>
        <p>Streaming services offer highly optimized, utilitarian interfaces for media consumption. However, I believe that these interfaces are falling short when it comes to <em>sharing</em> media.</p>
        <p>Interacting with physical media sparks the imagination and this tool is an attempt to bring some of this magic to the digital world.</p>
      </ContentBlock>
      <ContentBlock title='Want your own?'>
        <p>If you&apos;re interested in having your own <em>stakk</em>, I want to hear from you.&nbsp;
        {/*Fill out your email below and I&apos;ll get in touch.*/}
        Drop me an email with your idea at felix&#064;spoet&#46;tel and I&apos;ll get in touch.
        </p>
      </ContentBlock>
    </PageLayout>
  );
}

export default About;
