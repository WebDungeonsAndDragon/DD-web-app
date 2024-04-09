import React from "react";
import { Box, HStack, VStack, StackDivider } from "@chakra-ui/react";

import backgroundImage from "../MainPageComponents/images/nature-paper-texture.png";
import styles from "../MainPageComponents/PlayACTIVE.module.css";

const MainPage = ({ options, name }) => {
  return (
    <Box
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      width="100vw"
      height="100vh"
      position="fixed"
      top="0"
      left="0"
    >
      <VStack spacing={20}>
        <div className={styles.top}>
          <div className={styles.yourTurn}>
            <span className={styles.yourTurnTxtContainer}>
              <b>Your</b>
              <span className={styles.span}>{` `}</span>
              <span>Turn</span>
            </span>
          </div>
        </div>

        <HStack>
          <div className={styles.loremIpsumDolorContainer}>
            <p
              className={styles.blankLine}
            >{`Lorem ipsum dolor sit amet consectetur. Pharetra vestibulum laoreet facilisis non fermentum semper imperdiet amet malesuada. Cursus potenti vulputate eget egestas rutrum vitae. `}</p>
            <p className={styles.blankLine}>&nbsp;</p>
            <p className={styles.blankLine}>
              Maecenas ut phasellus pulvinar id dui non dapibus hac cras. Non
              praesent turpis amet eget libero. Nunc pellentesque feugiat at
              nibh nunc nisi. Placerat sem quisque sit senectus in scelerisque
              facilisi. Quisque sit diam orci fames at fringilla platea. Feugiat
              sit purus massa habitant suspendisse mauris.
            </p>
            <p className={styles.blankLine}>&nbsp;</p>
            <p className={styles.blankLine}>What will you do?</p>
          </div>
          <div className={styles.choices}>
            <div className={styles.choice1}>
              <img
                className={styles.naturePaperTexture1}
                alt=""
                src="/src/MainPageComponents/images/nature-paper-texture.png"
              />
              <b className={styles.loremIpsumDolor}>
                Lorem ipsum dolor sit amet consectetur. Vulputate urna fusce
                pellentesque aliquet et arcu pretium dignissim consectetur.
                Tristique nunc suscipit donec tempus quam. Amet felis sit elit
                nibh morbi quis et.
              </b>
            </div>
            <div className={styles.choice2}>
              <img
                className={styles.naturePaperTexture1}
                alt=""
                src="/src/MainPageComponents/images/nature-paper-texture.png"
              />
              <b className={styles.loremIpsumDolor}>
                Lorem ipsum dolor sit amet consectetur. Vulputate urna fusce
                pellentesque aliquet et arcu pretium dignissim consectetur.
                Tristique nunc suscipit donec tempus quam. Amet felis sit elit
                nibh morbi quis et.
              </b>
            </div>
            <div className={styles.choice3}>
              <img
                className={styles.naturePaperTexture1}
                alt=""
                src="/src/MainPageComponents/images/nature-paper-texture.png"
              />
              <b className={styles.loremIpsumDolor}>
                Lorem ipsum dolor sit amet consectetur. Vulputate urna fusce
                pellentesque aliquet et arcu pretium dignissim consectetur.
                Tristique nunc suscipit donec tempus quam. Amet felis sit elit
                nibh morbi quis et.
              </b>
            </div>
            <div className={styles.choice4}>
              <img
                className={styles.naturePaperTexture1}
                alt=""
                src="/src/MainPageComponents/images/nature-paper-texture.png"
              />
              <b className={styles.loremIpsumDolor}>
                Lorem ipsum dolor sit amet consectetur. Vulputate urna fusce
                pellentesque aliquet et arcu pretium dignissim consectetur.
                Tristique nunc suscipit donec tempus quam. Amet felis sit elit
                nibh morbi quis et.
              </b>
            </div>
          </div>
        </HStack>
      </VStack>
    </Box>
  );
};

export default MainPage;
