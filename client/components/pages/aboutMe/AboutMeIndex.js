import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useWindowSize from '../../../customHooks/useWindowSize'
import useLocalStorage from '../../../customHooks/useLocalStorage'

const AboutMeIndex = () => {

  const { width } = useWindowSize()
  const [keyWasPressed, setKeyWasPressed] = useLocalStorage('keyWasPressed', false)

  if(!keyWasPressed) {
    return (
      <div
        className='aboutMe-gif'
        onClick={() => setKeyWasPressed(true)}
        onKeyPress={()=> setKeyWasPressed(true)}
      >
        <h4>Press the Any Key</h4>
        <img src="/pictures/pressAnyKey.gif" alt="press any key gif" />
      </div>
    )
  } else {
    return  (
      <div className='aboutMe-wrapper'>
        <h2 className='aboutMe-header'>About ME</h2>
        <div className='aboutMe-card1'>
          <img src="/pictures/codeAllNight.gif" alt="code all night gif" />
          <p className='wide-view-only'>Hi! My Name is Anatoly Tsinker and I am an aspiring web developer specializing in the PERN stack.
          I am a naturalized Ukrainian immigrant who joined the United States Navy shortly after highschool in 2009. There, I proudly served as an electrician's mate for 4 years and reached the rank of petty officer second class. In those long years, I learned a lot about the importance of teamwork, about structure and discipline, and about  the value of a proper work ethic.</p>
        </div>
        <p className='thin-view-only'>Hi! My Name is Anatoly Tsinker and I am an aspiring web developer specializing in the PERN stack.</p>
        <p className='thin-view-only'>I am a naturalized Ukrainian immigrant who joined the United States Navy shortly after highschool in 2009. There, I proudly served as an electrician's mate for 4 years and reached the rank of petty officer second class. In those long years, I learned a lot about the importance of teamwork, about structure and discipline, and about  the value of a proper work ethic.</p>
        <p>In 2013, at the end of my contract, I moved back to New York city. I took the technical and organizational skills I had acquired and started my career as an electrician. I worked for O + I electric  For six years from 2014, up to the point at which  the company dissolved in 2019. </p>
        <p> 2020 was a hard time in my life. It had become apparent that I would not find new employment without taking a pay cut, I was denied entry into Local 3, New York's electricians union, and on top of that, the Covid epidemic was taking off.</p>
        <p>  Just before that, In November 2018, my girlfriend and I were married. We were just starting our new life together when I found myself at a crossroads. My career as an electrician had plateaued. It had occurred to me that being an electrician  was never something I explicitly chose. At the time I joined the Navy, I was a poor teenager with few options and the job was chosen for me.  </p>
        <p>From an early age, I was always in love with puzzles, strategy, and mathematics. I spent countless hours playing Go, Chess, Twenty-four, and any other game of strategy I could get my hands on. It was never the game itself that gave me joy, but solving the puzzle. Figuring out the formula, optimizing, pulling the curtain off of the chaos and finding order.</p>
        <p> Now it was 2020, and I found myself with the finances and support structures to make a real choice for myself. I chose to take a risk, to switch careers.  I would choose to do something I had passion for, a thing I found deeply rewarding, the path  I would walk for the rest of my life. </p>
        <p className='thin-view-only'>
            In 2020, I wrote my first hello world in Python. I spent months learning the language, weeks on Leetcode and Codewars. In mid 2020, I taught myself Java and picked up OOC. Shortly after, Javascript and functional programming. In 2021, I attended and graduated from Fullstack Academy. I am now engrossed in code, in the way apps work, in  networks and optimization.
          </p>
        <div className='aboutMe-card2'>
          <div className='wide-view-only'>
            <p>
              In 2020, I wrote my first hello world in Python. I spent months learning the language, weeks on Leetcode and Codewars. In mid 2020, I taught myself Java and picked up OOC. Shortly after, Javascript and functional programming. In 2021, I attended and graduated from Fullstack Academy. I am now engrossed in code, in the way apps work, in  networks and optimization.
            </p>
          </div>
          <img src={width > 1000 ?  "/pictures/aboutMeSlide.png" : "/pictures/AboutMeSlideMini.png" }alt="about me funny slide" />
        </div>
        <p>  In 2022, I managed to find freelance work, locked myself in a room for 2 months  and developed version 1 of PlanetScottishFold.com.</p>
        <p>Now, I'm looking to put my skills to the test, to be a part of a team working on something bigger than what I can handle alone.  Consider letting me put my skills, my talents, and my passion to work for you. You will not regret it.</p>
      </div>
    )
  }
}


export default AboutMeIndex
