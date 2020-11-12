import React from "react"

import NavBar from "../components/navbar"
import infoboxStyle from "../components/modules/infobox.module.css"

export default () => {

    return (
        <div>
            <NavBar />


            <h1 class="page-title">CDC Guidelines</h1>


        <div className={infoboxStyle.masonrycontainer}>
            <div className={infoboxStyle.masonryitem}>
              <div className={infoboxStyle.masonrycontent}>
                <h2>Know how it spreads</h2>
                <ul>
                    <li>There is currently no vaccine to prevent coronavirus disease 2019 (COVID-19).</li>
                    <li>The best way to prevent illness is to avoid being exposed to this virus.</li>
                    <li>The virus is thought to spread mainly from person-to-person.
                      <ul>
                        <li>Between people who are in close contact with one another (within about 6 feet).</li>
                        <li>Through respiratory droplets produced when an infected person coughs, sneezes or talks.</li>
                        <li>These droplets can land in the mouths or noses of people who are nearby or possibly be inhaled into the lungs.</li>
                        <li>Some recent studies have suggested that COVID-19 may be spread by people who are not showing symptoms.</li>
                      </ul>
                    </li>
                  </ul>
              </div>
            </div>
            <div className={infoboxStyle.masonryitem}>
              <div className={infoboxStyle.masonrycontent}>
               
                <h2>Wash your hands often</h2>
                <ul>
                    <li>Wash your hands often with soap and water for at least 20 seconds especially after you have been in a public place, or after blowing your nose, coughing, or sneezing.</li>
                    <li>It’s especially important to wash:
                    <ul>
                        <li>Before eating or preparing food</li>
                        <li>Before touching your face</li>
                        <li>After using the restroom</li>
                        <li>After leaving a public place</li>
                        <li>After blowing your nose, coughing, or sneezing</li>
                        <li>After handling your mask</li>
                        <li>After changing a diaper</li>
                        <li>After caring for someone sick</li>
                        <li>After touching animals or pets</li>
                    </ul>
                    </li>
                    <li>If soap and water are not readily available, use a hand sanitizer that contains at least 60% alcohol. Cover all surfaces of your hands and rub them together until they feel dry.</li>
                    <li>Avoid touching your eyes, nose, and mouth with unwashed hands.</li>
                </ul>
              </div>
            </div>
            <div className={infoboxStyle.masonryitem}>
              <div className={infoboxStyle.masonrycontent}>
               
                <h2>Avoid close contact</h2>
                <ul>
                    <li>Inside your home: Avoid close contact with people who are sick.
                    <ul>
                        <li>If possible, maintain 6 feet between the person who is sick and other household members.</li>
                    </ul>
                    </li>
                    <li>Outside your home: Put 6 feet of distance between yourself and people who don’t live in your household.
                        <ul>
                            <li>Remember that some people without symptoms may be able to spread virus.</li>
                            <li>Stay at least 6 feet (about 2 arms’ length) from other people.</li>
                            <li>Keeping distance from others is especially important for people who are at higher risk of getting very sick.</li>
                        </ul>
                        </li>
                </ul>
              </div>
            </div>
            <div className={infoboxStyle.masonryitem}>
                <div className={infoboxStyle.masonrycontent}>
                 
                    <h2>Cover your mouth and nose with a mask when around others</h2>
                    <ul>
                      <li>You could spread COVID-19 to others even if you do not feel sick.</li>
                      <li>The mask is meant to protect other people in case you are infected.</li>
                      <li>Everyone should wear a mask in public settings and when around people who don’t live in your household, especially when other social distancing measures are difficult to maintain.
                          <ul>
                              <li>Masks should not be placed on young children under age 2, anyone who has trouble breathing, or is unconscious, incapacitated or otherwise unable to remove the mask without assistance.</li>
                          </ul>
                          </li>
                          <li>Do NOT use a mask meant for a healthcare worker. Currently, surgical masks and N95 respirators are critical supplies that should be reserved for healthcare workers and other first responders.</li>
                          <li>Continue to keep about 6 feet between yourself and others. The mask is not a substitute for social distancing.</li>
                  </ul>
                </div>
              </div>
              <div className={infoboxStyle.masonryitem}>
                <div className={infoboxStyle.masonrycontent}>
                  
                    <h2>Cover coughs and sneezes</h2>
                    <ul>
                      <li>Always cover your mouth and nose with a tissue when you cough or sneeze or use the inside of your elbow and do not spit.</li>
                      <li>Throw used tissues in the trash</li>
                      <li>Immediately wash your hands with soap and water for at least 20 seconds. If soap and water are not readily available, clean your hands with a hand sanitizer that contains at least 60% alcohol.</li>
                  </ul>
                </div>
              </div>
              <div className={infoboxStyle.masonryitem}>
                <div className={infoboxStyle.masonrycontent}>
                  
                    <h2>Clean and disinfect</h2>
                    <ul>
                        <li>Clean AND disinfect frequently touched surfaces daily. This includes tables, doorknobs, light switches, countertops, handles, desks, phones, keyboards, toilets, faucets, and sinks.</li>
                        <li>If surfaces are dirty, clean them. Use detergent or soap and water prior to disinfection.</li>
                        <li>Then, use a household disinfectant. Most common EPA-registered household disinfectants will work.</li>
                    </ul>
                </div>
              </div>
              <div className={infoboxStyle.masonryitem}>
                <div className={infoboxStyle.masonrycontent}>
                 
                    <h2>Monitor Your Health Daily</h2>
                    <ul>
                      <li>Be alert for symptoms. Watch for fever, cough, shortness of breath, or other symptoms of COVID-19.
                      <ul>
                          <li>Especially important if you are running essential errands, going into the office or workplace, and in settings where it may be difficult to keep a physical distance of 6 feet.</li>
                      </ul>
                      </li>
                      <li>Take your temperature if symptoms develop.
                          <ul>
                              <li>Don’t take your temperature within 30 minutes of exercising or after taking medications that could lower your temperature, like acetaminophen.</li>
                          </ul>
                        </li>
                        <li>Follow CDC guidance if symptoms develop.</li>
                  </ul>
                </div>
              </div>

          </div>
          <p>This information comes directly from the Centers for Disease Control and Prevention Website.</p>
          <p>For more information, go to <a href="https://www.cdc.gov/">CDC.gov</a></p>
 
        </div>
    )
}