import React from 'react';

import styles from "../MainPageComponents/PlayACTIVE.module.css";

const MainPage = () => {
  return (
    <div>
      <div className="top-bar">Your Turn</div>
      <div className={styles.playActive}>
        <div className={styles.playActiveChild} />
        <div className={styles.loremIpsumDolorContainer}>
          <p
            className={styles.loremIpsumDolor}
          >{`Lorem ipsum dolor sit amet consectetur. Pharetra vestibulum laoreet facilisis non fermentum semper imperdiet amet malesuada. Cursus potenti vulputate eget egestas rutrum vitae. `}</p>
          <p className={styles.loremIpsumDolor}>&nbsp;</p>
          <p className={styles.loremIpsumDolor}>
            Maecenas ut phasellus pulvinar id dui non dapibus hac cras. Non
            praesent turpis amet eget libero. Nunc pellentesque feugiat at nibh
            nunc nisi. Placerat sem quisque sit senectus in scelerisque facilisi.
            Quisque sit diam orci fames at fringilla platea. Feugiat sit purus
            massa habitant suspendisse mauris.
          </p>
          <p className={styles.loremIpsumDolor}>&nbsp;</p>
          <p className={styles.loremIpsumDolor}>What will you do?</p>
        </div>
        <div className={styles.settings} />
        <div className={styles.top}>
          <div className={styles.topChild} />
          <div className={styles.yourTurn}>
            <span className={styles.yourTurnTxtContainer}>
              <b>Your</b>
              <span className={styles.turn}> Turn</span>
            </span>
          </div>
          <div className={styles.div}>0:47</div>
          <img className={styles.topItem} alt="" src="/vector-46.svg" />
        </div>
        <div className={styles.playActiveItem} />
        <div className={styles.statsTab}>
          <div className={styles.statsTabChild} />
          <div className={styles.stats}>Stats</div>
        </div>
        <b className={styles.shreya}>Shreya</b>
        <b className={styles.cleric}>Cleric</b>
        <div className={styles.detailsTab}>
          <div className={styles.detailsTabChild} />
          <div className={styles.details}>Details</div>
        </div>
        <div className={styles.detailsTab1}>
          <div className={styles.detailsTabItem} />
          <div className={styles.roomInfo}>Room Info</div>
        </div>
        <div className={styles.healthStat}>
          <div className={styles.health}>Health</div>
          <div className={styles.div1}>75/100</div>
          <div className={styles.healthBar}>
            <div className={styles.healthBarChild} />
            <div className={styles.healthBarItem} />
          </div>
        </div>
        <div className={styles.charStat}>
          <div className={styles.health}>Charisma</div>
          <div className={styles.div1}>95/100</div>
          <div className={styles.healthBar}>
            <div className={styles.healthBarChild} />
            <div className={styles.rectangleDiv} />
          </div>
        </div>
        <div className={styles.intelStat}>
          <div className={styles.health}>Intelligence</div>
          <div className={styles.div3}>60/100</div>
          <div className={styles.healthBar}>
            <div className={styles.healthBarChild} />
            <div className={styles.healthBarChild2} />
          </div>
        </div>
        <div className={styles.playActiveInner} />
        <div className={styles.playActiveChild1} />
        <div className={styles.playActiveChild2} />
        <div className={styles.playActiveChild3} />
        <div className={styles.scroll}>
          <div className={styles.scrollChild} />
          <div className={styles.scrollItem} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;