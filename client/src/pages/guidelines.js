import React from "react"
import { Link } from "react-router-dom"
import NavBar from "../components/navbar"
import infoboxStyle from "../components/modules/infobox.module.css"
import Footer from "../components/footer"
import PageFrame from "../components/pageframe"
import Guidelines1 from "../images/guidelines1.png"
import Guidelines2 from "../images/guidelines2.png"
import Guidelines3 from "../images/guidelines3.png"
import Guidelines4 from "../images/guidelines4.png"
import Guidelines5 from "../images/guidelines5.png"
import Guidelines6 from "../images/guidelines6.png"
import Guidelines7 from "../images/guidelines7.png"


// STYLE: it looks like these list bullets are being duplicated in some of the cards
export default () => {

    return (
      <PageFrame gutter="0">

            <h1 className="page-title">CDC Guidelines</h1>

            <p className={infoboxStyle.cdcSource}>This information comes directly from the Centers for Disease Control and Prevention Website. For more information, go to <a target="_blank" href="https://www.cdc.gov/" className="underline">CDC.gov</a></p>

        <div className={infoboxStyle.masonrycontainer}>
            <div className={`${infoboxStyle.masonryitem} ${infoboxStyle.itemOne}`}>
              <div className={infoboxStyle.masonrycontent}>

                  <div className={infoboxStyle.iconDiv}>
                    <img src={Guidelines1} className={infoboxStyle.icon}/>
                    <h3>Know how it spreads</h3>
                  </div>
                
                
                  <p>&#8226; There is currently no vaccine to prevent coronavirus disease 2019 (COVID-19).</p>
                  <p>&#8226; The best way to prevent illness is to avoid being exposed to this virus.</p>
                  <p>&#8226; The virus is thought to spread mainly from person-to-person.</p>
                    <ul>
                      <p className={infoboxStyle.openCircle}> Between people who are in close contact with one another (within about 6 feet).</p>
                      <p className={infoboxStyle.openCircle}> Through respiratory droplets produced when an infected person coughs, sneezes or talks.</p>
                      <p className={infoboxStyle.openCircle}> These droplets can land in the mouths or noses of people who are nearby or possibly be inhaled into the lungs.</p>
                      <p className={infoboxStyle.openCircle}> Some recent studies have suggested that COVID-19 may be spread by people who are not showing symptoms.</p>
                    </ul>
              </div>
            </div>
            <div className={`${infoboxStyle.masonryitem} ${infoboxStyle.itemTwo}`}>
              <div className={infoboxStyle.masonrycontent}>

                <div className={infoboxStyle.iconDiv}>
                    <img src={Guidelines2} className={infoboxStyle.icon}/>
                    <h3>Wash your hands often</h3>
                </div>
                <p>&#8226; Wash your hands often with soap and water for at least 20 seconds especially after you have been in a public place, or after blowing your nose, coughing, or sneezing.</p>
                <p>&#8226; It’s especially important to wash:</p>
                <p>&#8226; If soap and water are not readily available, <strong>use a hand sanitizer that contains at least 60% alcohol.</strong> Cover all surfaces of your hands and rub them together until they feel dry.</p>
                <p>&#8226; <strong>Avoid touching your eyes, nose, and mouth</strong> with unwashed hands.</p>
                <ul>
                    <p className={infoboxStyle.openCircle}> Before eating or preparing food</p>
                    <p className={infoboxStyle.openCircle}> Before touching your face</p>
                    <p className={infoboxStyle.openCircle}> After using the restroom</p>
                    <p className={infoboxStyle.openCircle}> After leaving a public place</p>
                    <p className={infoboxStyle.openCircle}> After blowing your nose, coughing, or sneezing</p>
                    <p className={infoboxStyle.openCircle}> After handling your mask</p>
                    <p className={infoboxStyle.openCircle}> After changing a diaper</p>
                    <p className={infoboxStyle.openCircle}> After caring for someone sick</p>
                    <p className={infoboxStyle.openCircle}> After touching animals or pets</p>
                </ul>
              </div>
            </div>
            <div className={`${infoboxStyle.masonryitem} ${infoboxStyle.itemThree}`}>
              <div className={infoboxStyle.masonrycontent}>
              <div className={infoboxStyle.iconDiv}>
                    <img src={Guidelines3} className={infoboxStyle.icon}/>
                <h3>Avoid close contact</h3>
                </div>
                <p>&#8226; <strong>Inside your home:</strong> Avoid close contact with people who are sick.</p>
                <ul>
                    <p className={infoboxStyle.openCircle}> If possible, maintain 6 feet between the person who is sick and other household members.</p>
                </ul>
                <p>&#8226; <strong>Outside your home:</strong> Put 6 feet of distance between yourself and people who don’t live in your household.</p>
                    <ul>
                        <p className={infoboxStyle.openCircle}> Remember that some people without symptoms may be able to spread virus.</p>
                        <p className={infoboxStyle.openCircle}> Stay at least 6 feet (about 2 arms’ length) from other people.</p>
                        <p className={infoboxStyle.openCircle}> Keeping distance from others is especially important for people who are at higher risk of getting very sick.</p>
                    </ul>
              </div>
            </div>
            <div className={`${infoboxStyle.masonryitem} ${infoboxStyle.itemFour}`}>
                <div className={infoboxStyle.masonrycontent}>
                <div className={infoboxStyle.iconDiv}>
                    <img src={Guidelines4} className={`${infoboxStyle.icon} ${infoboxStyle.guidelines4}`}/>
                  <h3>Cover your mouth and nose with a mask when around others</h3>
                  </div>
                  <p>&#8226; You could spread COVID-19 to others even if you do not feel sick.</p>
                  <p>&#8226; The mask is meant to protect other people in case you are infected.</p>
                  <p>&#8226; Everyone should wear a mask in public settings and when around people who don’t live in your household, especially when other social distancing measures are difficult to maintain.</p>
                      <ul>
                          <p className={infoboxStyle.openCircle}> Masks should not be placed on young children under age 2, anyone who has trouble breathing, or is unconscious, incapacitated or otherwise unable to remove the mask without assistance.</p>
                      </ul>
                  <p>&#8226; Do NOT use a mask meant for a healthcare worker. Currently, surgical masks and N95 respirators are critical supplies that should be reserved for healthcare workers and other first responders.</p>
                  <p>&#8226; Continue to keep about 6 feet between yourself and others. The mask is not a substitute for social distancing.</p>
                </div>
              </div>
              <div className={`${infoboxStyle.masonryitem} ${infoboxStyle.itemFive}`}>
                <div className={infoboxStyle.masonrycontent}>
                <div className={infoboxStyle.iconDiv}>
                    <img src={Guidelines5} className={infoboxStyle.icon}/>
                  <h3>Cover coughs and sneezes</h3>
                  </div>
                  <p>&#8226; <strong>Always cover your mouth and nose</strong> with a tissue when you cough or sneeze or use the inside of your elbow and do not spit.
                  </p>
                  <p>&#8226; <strong>Throw used tissues</strong> in the trash</p>
                  <p>&#8226; Immediately <strong>wash your hands</strong> with soap and water for at least 20 seconds. If soap and water are not readily available, clean your hands with a hand sanitizer that contains at least 60% alcohol.</p>
                </div>
              </div>
              <div className={`${infoboxStyle.masonryitem} ${infoboxStyle.itemSix}`}>
                <div className={infoboxStyle.masonrycontent}>
                <div className={infoboxStyle.iconDiv}>
                    <img src={Guidelines6} className={infoboxStyle.icon}/>
                  <h3>Clean and disinfect</h3>
                  </div>
                  <p>&#8226; <strong>Clean AND disinfect</strong> frequently touched surfaces daily. This includes tables, doorknobs, light switches, countertops, handles, desks, phones, keyboards, toilets, faucets, and sinks.</p>
                  <p>&#8226; <strong>If surfaces are dirty, clean them.</strong> Use detergent or soap and water prior to disinfection.</p>
                  <p>&#8226; <strong>Then, use a household disinfectant.</strong> Most common EPA-registered household disinfectants will work.</p>
                </div>
              </div>
              <div className={`${infoboxStyle.masonryitem} ${infoboxStyle.itemSeven}`}>
                <div className={infoboxStyle.masonrycontent}>
                <div className={infoboxStyle.iconDiv}>
                    <img src={Guidelines7} className={infoboxStyle.icon}/>
                  <h3>Monitor Your Health Daily</h3>
                  </div>
                  <p>&#8226; <strong>Be alert for symptoms.</strong> Watch for fever, cough, shortness of breath, or other symptoms <strong>of COVID-19.</strong></p>
                  <ul>
                      <p className={infoboxStyle.openCircle}> Especially important if you are running essential errands, going into the office or workplace, and in settings where it may be difficult to keep a physical distance of 6 feet.</p>
                  </ul>
                  <p>&#8226; <strong>Take your temperature</strong> if symptoms develop.</p>
                    <ul>
                        <p className={infoboxStyle.openCircle}> Don’t take your temperature within 30 minutes of exercising or after taking medications that could lower your temperature, like acetaminophen.</p>
                    </ul>
                  <p>&#8226; Follow CDC guidance if symptoms develop.</p>
                </div>
              </div>

          </div>
        </PageFrame>
    )
}