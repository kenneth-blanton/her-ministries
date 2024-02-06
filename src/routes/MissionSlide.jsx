import herLogo from "../images/herLogo.png";
import outlineBG from "../images/i9xUri01.svg";
// import outlineBG from "../images/image-removebg-preview.png";
import logoNoBG from "../images/logoNoBG.png";
import "../App.css";

export default function MissionSlide() {
  return (
    <>
      <img src={outlineBG} alt="bg" id="together" />
      <div className="aboutDesc">
        <p>
          HER is a ministry dedicated to providing a safe and supportive
          environment for women to heal from the trauma they have experienced.
          We believe that every woman deserves to feel secure and empowered, and
          we strive to create a space where they can do just that. Our team is
          comprised of caring and compassionate women who have their own
          survival stories.
        </p>
        <p>
          We believe that the word of God coupled counseling and practical
          application can be powerful during the healing process, and we are
          dedicated to helping women deepen their understanding of God's love
          and guidance and providing them community resources to obtain the
          practical tools necessary to achieve their healing goals.
        </p>
        <p>
          Finally, we are committed to providing opportunities for women become
          a part of a sisterhood that will transform and enhance their growth.
          Whether it's through conferences, retreats, and community outreach. We
          are here to support and encourage them every step of the way, and we
          are dedicated to helping them reach their full potential.
        </p>
      </div>
    </>
  );
}
