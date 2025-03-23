import Carousel from "../content/carousel";
import Text from "../content2/text";
import HomeContent from "../content2/homecontent";
import Email from "../content2/email";
import Visit from "../content/vis";
import Calender from "../content2/calender";
import TopRibbon from "../content/topRibbon";

function Home() {
  return (
    <>
      <TopRibbon />
      <Carousel />
      <Visit />
      <Text />
      <HomeContent />
      <Email />
      <Calender />
    </>
  );
}

export default Home;
