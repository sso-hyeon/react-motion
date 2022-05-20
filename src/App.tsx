import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { RecoilBridge } from "recoil";

const Wrapper = styled(motion.div)`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;
const Grid = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 30px;
`;
const Box = styled(motion.div)`
    width: 350px;
    height: 200px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Circle = styled(motion.div)`
    background-color: #00a5ff;
    height: 50px;
    width: 50px;
    border-radius: 25px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Overlay = styled(motion.div)`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const SwitchBtn = styled(motion.button)`
    background-color: white;
    color: rgb(171, 70, 210);
    font-size: 20px;
    font-weight: bold;
    border: 0;
    padding: 5px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
    transition: 0.5s;
`;

const boxVariants = {
    hover: (n: string) => ({
        scale: 1.2,
        transformOrigin: n === "1" ? "bottom right" : "top left"
    })
};

function App() {
    const [btnClicked, setBtnClicked] = useState(false);
    const [id, setId] = useState("");
    const btnToggle = () => setBtnClicked(prev => !prev);

    return (
        <Wrapper>
            <Grid>
                {["1", "2", "3", "4"].map(n =>
                    n === "1" || n === "4" ? (
                        <Box
                            custom={n}
                            onClick={() => setId(n)}
                            key={n}
                            layoutId={n}
                            variants={boxVariants}
                            whileHover="hover"
                        ></Box>
                    ) : n === "2" ? (
                        <Box key={n}>
                            {!btnClicked ? <Circle layoutId="circle" /> : null}
                        </Box>
                    ) : (
                        <Box key={n}>
                            {btnClicked ? <Circle layoutId="circle" /> : null}
                        </Box>
                    )
                )}
            </Grid>
            <AnimatePresence>
                {id ? (
                    <Overlay
                        onClick={() => setId("")}
                        initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                        animate={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                        exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                    >
                        <Box
                            layoutId={id}
                            style={{ backgroundColor: "rgba(255,255,255,1)" }}
                        ></Box>
                    </Overlay>
                ) : null}
            </AnimatePresence>
            <SwitchBtn
                onClick={btnToggle}
                style={{
                    color: btnClicked ? "rgb(255,111,181)" : "rgb(171,70,210)",
                    scale: btnClicked ? 1.2 : 1
                }}
            >
                Switch
            </SwitchBtn>
        </Wrapper>
    );
}

export default App;
