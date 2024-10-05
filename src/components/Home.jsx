import './styles/Home.css';
import prisoner from '../assets/prisoner.png';
import judge from '../assets/judge.jpg';
import lawyer from '../assets/lawyer.jpg';
import Header from './Header';
import FAQ from './FAQs';
import Footer from './Dashboard comps/Footer';
import Gochatbot from './Gochatbot';
import Images from './Images';
function Home()
{
    let startupqr='startup';
    let druginspector='druginspector';
    let authority='authority';
    function startupLogin()
    {
        window.location.href = `/login?value=${'prisoner'}`;
    }
    function authoriLogin()
    {
        window.location.href = `/login?value=${'judge'}`;
    }
    function drugLogin()
    {
        window.location.href = `/login?value=${'lawyer'}`;
    }
    function goStartup()
    {
        window.location.href=`/signupprisoner`;
    }
    function goauth()
    {
        window.location.href='/signupjudge'
    }
    function godrug()
    {
        window.location.href='/signuplawyer'
    }
    
    const StartupFaqData=[
        { question: "What is bail?", answer: "Bail is the temporary release of an accused person awaiting trial, sometimes on condition that a sum of money be lodged to guarantee their appearance in court." },
        { question: "Who is eligible for bail in India?", answer: "Eligibility for bail depends on the nature of the offense. For bailable offenses, bail is granted as a matter of right. For non-bailable offenses, the decision is at the discretion of the court." },
        { question: "How can I apply for bail?", answer: "To apply for bail, you must file a bail application in the court where the trial is being held, or in a higher court if necessary. Your lawyer will draft and submit this application on your behalf." },
        { question: "What are bailable and non-bailable offenses?", answer: "Bailable offenses are those where bail can be granted as a right, while non-bailable offenses require the discretion of the court to grant or deny bail, depending on the circumstances." },
        { question: "Can I get bail for a non-bailable offense?", answer: "Yes, but it is at the discretion of the court. The court will consider factors like the severity of the offense, likelihood of fleeing, and potential threat to society." },
        { question: "What conditions can be imposed with bail?", answer: "Conditions may include regular court appearances, surrendering your passport, not leaving the jurisdiction, or providing a surety who will ensure your compliance with bail conditions." },
        { question: "What is anticipatory bail?", answer: "Anticipatory bail is a direction to release a person on bail, issued even before the person is arrested, when there is a fear of arrest on accusation of a non-bailable offense." },
        { question: "Can bail be canceled?", answer: "Yes, bail can be canceled if the accused violates any conditions of bail or engages in activities that obstruct the course of justice, such as tampering with evidence or intimidating witnesses." },
        { question: "What is the procedure for getting anticipatory bail?", answer: "You need to apply for anticipatory bail before arrest by filing an application in the Sessions Court or High Court, explaining the reason for apprehending arrest." },
        { question: "What happens if my bail application is rejected?", answer: "If your bail application is rejected by a lower court, you can appeal to a higher court, such as the Sessions Court, High Court, or even the Supreme Court, depending on the case." },
    ];
    const handleRedirect = () => {
        window.open("https://youtu.be/Hp4MiQTtvp8?si=uIzEcKf4K1K4nBYK", "_blank");
      };

    return(
        <div className='the-home'>
       <Header/>
       {/* <Images/> */}
        <div className="home-main">
           <div className="home-main-startup">
               <img id="home-main-img" src={prisoner}/>
               <p id="type-title">Prisoner</p>
               <button id="home-main-signin" onClick={goStartup} >Sign Up</button>
               <button id="home-main-login" onClick={startupLogin}>Login</button>
           </div>
           <div className="home-main-auth">
               <img id="home-main-img2" src={judge}/>
               <p id="type-title">Judge</p>
               <button id="home-main-signin" onClick={goauth} >Sign Up</button>
               <button id="home-main-login" onClick={authoriLogin}>Login</button>
           </div>
           <div className="home-main-drug">
               <img id="home-main-img3" src={lawyer}/>
               <p id="type-title">Lawyer</p>
               <button id="home-main-signin" onClick={godrug} >Sign Up</button>
               <button id="home-main-login" onClick={drugLogin}>Login</button>
           </div>
           </div>
           
           <center>
      <p onClick={handleRedirect} style={{ cursor: 'pointer', color: 'blue', fontSize:"1.3rem" }}>
        Click here to watch the demo video
      </p>
          </center>
        <div className="home-faq">
            <FAQ faqdata={StartupFaqData} who={"Ayush StartUps"} />
        </div>
       <Gochatbot/>
        <Footer/>
        </div>
    );
}
export default Home;
