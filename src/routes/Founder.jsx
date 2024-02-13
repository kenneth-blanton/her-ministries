import herLogo from "../images/herLogo.png";
import testing from "../images/testing.png";
import { Link } from "react-router-dom";

export default function Founder() {
  return (
    <div id="founderSection">
      <div>
        <div>
          <h2>Dianna Williams McBride: A Beacon of Hope and Healing</h2>
          <p>
            Evangelist Dianna Williams McBride is an inspiring woman of God who
            uses her gift of ministering to bring deliverance and healing to the
            total person, mind, body, and spirit. Her mission is to provide a
            safe place for women to heal from trauma and equip them with
            biblical knowledge and practical application.
          </p>
        </div>
      </div>

      <div>
        <div>
          <h2>From Education to Service</h2>
          <p>
            Dianna is a Board-Certified Christian Counselor who received her
            formal education from Southwestern Assemblies of God University,
            where she specialized in Counseling and obtained a Bachelor's Degree
            in Human Services. She is also a proud member of the National
            Association of Christian Counselors and serves on the Ministerial
            Staff and ECC Women's Ministry at Empowerment Community Center.
          </p>
        </div>
      </div>

      <div>
        <div>
          <h2>Healing Rooted in Faith</h2>
          <p>
            Dianna's work is a true testament to the scripture that "all things
            work together for good to them that love God, to them who are the
            called according to his purpose" (Romans 8:28). As the Founder/CEO
            of HER Ministries, she along with her team is dedicated to providing
            a safe and supportive environment for women to heal from the trauma
            they have experienced. The ministry believes that every woman
            deserves to feel secure and empowered, and it strives to create a
            safe space where they can walk in healing, empowerment, and
            restoration.
          </p>
          <Link to="/about/vision">Get Involved</Link>
        </div>
      </div>

      <div>
        <div>
          <h2>Empowering Women Through Support & Growth</h2>
          <p>
            HER Ministries provides opportunities for women to learn, grow, and
            connect with one another through various programs and events. The
            ministry offers counseling services, support groups, workshops, and
            retreats that equip women with biblical knowledge and practical
            tools to help them overcome their challenges. Through HER
            Ministries, women are empowered to live purposeful and fulfilling
            lives, and to become the best versions of themselves.
          </p>
          <Link to="/contact">Connect</Link>
        </div>
      </div>
    </div>
  );
}
