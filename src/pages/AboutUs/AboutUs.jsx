import React from 'react'
import './AboutUs.scss'

export default function AboutUs() {
    const listAboutUs = [
        
        {
            img:"",
            title:"",
            content1:"",
            content2:""
        },
        {
            img:"",
            title:""
        }
    ]
  return (
      <div >
          <div className='containerItem' >
                <div className='containerItem-img'>
                  <img src="https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2FAboutUs%2Fcurtbarter.jpg?alt=media&token=9491de53-925b-4925-9767-09037ab7cb8e" alt="" />
                </div>
                <div>
                  <div className='containerItem-title'>
                      <h3>THE STORY BEHIND DANIEL WELLINGTON</h3>
                </div>
                  <div className='containerItem-content'>
                    <p>
                          It was a coincidental meeting halfway around the world that inspired the idea for Daniel Wellington. On this trip, our founder, Filip Tysander, met an intriguing British gentleman with impeccable yet understated style. The man had a particular fondness for wearing his vintage watches on old, weathered NATO straps. His name? Daniel Wellington.
                    <br/>
                          Inspired by his new acquaintance’s timeless style, Filip decided to create his own line of watches. Minimalistic and refined, the classic design with interchangeable straps that came to be has become a staple, with truly wide-ranging appeal. A few years on, this design is still part of the fabric of what makes Daniel Wellington so special.
                    </p>
                </div>
            </div>
        </div>

        <div className='containerItem' >
            <div>
                <div className='containerItem-title'>
                      <h3>THE DESIGN</h3>
                </div>
                <div className='containerItem-content'>
                    <p>
                          Daniel Wellington loved to wear his watches on old NATO straps. We liked the ingenuity of this combination so much that we wanted to incorporate the idea in our own line of watches. It was imperative for us to craft a modern yet truly classic watch. We wanted a clean and minimalistic design that would complement the various patterns and colours of the iconic NATO straps.
                        <br />
                          After returning from his travels, Filip sat down and began to look at different samples and colour ways. It was important that he loved the watch himself, or he could never sell it and be proud of it. Slowly but surely, a beautiful watch emerged. It was thin, elegant and perfectly round. A testament to minimalistic Scandinavian design, with the precision and accuracy of a Japanese movement watch.
                    </p>
                </div>
            </div>
              <div className='containerItem-img'>
                  <img src="https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2FAboutUs%2Fwalids.jpg?alt=media&token=003cd050-9eca-461b-89cc-91d9e839f0d8" alt="" />
              </div>
        </div>

        <div className='containerItem' >
            <div className='containerItem-img'>
                  <img src="https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2FAboutUs%2FMutyamasayu.jpg?alt=media&token=4a1fa466-39cc-4ad2-b3f6-db57fcadecc2" alt="" />
            </div>
            <div>
                <div className='containerItem-title'>
                      <h3>A WATCH FOR EVERY OCCASION</h3>
                </div>
                <div className='containerItem-content'>
                    <p>
                          Whether you are attending a black-tie event, playing a game of tennis or enjoying a sunny day at the beach club, a classic Daniel Wellington watch is the perfect companion for every occasion and any setting.
                        <br />
                          All of our watch faces are designed with timeless style and versatility in mind, developed to match effortlessly with our interchangeable NATO, mesh or leather straps.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
