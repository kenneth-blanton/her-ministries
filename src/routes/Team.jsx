import Amber from "../images/Amber Neason, Administrative Assistant.jpg";
import Deanna from "../images/Deanna Hernandez, Volunteer Coordinator.png";
// import Hervery from "../images/Hervery's Headshot.png";
import Jennifer from "../images/Jennifer Colbert, Executive Administrator.jpg";
import Latesha from "../images/Latesha Collins, Program Manager.png";
import Linda from "../images/Linda Collins, Team Member.png";

export default function Team() {
  const width = 300;
  const height = 300;

  return (
    <div id="teamSection">
      <h1>Meet the Team</h1>

      <div>
        <div>
          <h2>Jennifer Colbert</h2>
          <p>Executive Administrator</p>
          <img src={Jennifer} alt="Jennifer" width={width} height={400} />
        </div>
      </div>

      <div>
        <div>
          <h2>Amber Neason</h2>
          <p>Administrative Assistant</p>
          <img src={Amber} alt="Amber" width={width} height={height} />
        </div>
      </div>

      {/* <div>
        <div>
          <h2>Latresa Hervery</h2>
          <p>Board Member</p>
          <img src={Hervery} alt="Hervery" width={width} height={height} />
        </div>
      </div> */}

      <div>
        <div>
          <h2>Latesha Collins</h2>
          <p>Program Manager</p>
          <img src={Latesha} alt="Latesha" width={width} height={height} />
        </div>
      </div>

      <div>
        <div>
          <h2>Deanna Hernandez</h2>
          <p>Volunteer Coordinator</p>
          <img src={Deanna} alt="Deanna" width={width} height={height} />
        </div>
      </div>

      <div>
        <div>
          <h2>Linda Collins</h2>
          <p>Team Member</p>
          <img src={Linda} alt="Linda" width={width} height={height} />
        </div>
      </div>
    </div>
  );
}
