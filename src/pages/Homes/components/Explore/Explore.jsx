import React from 'react'
import './Explore.scss'


export default function Explore() {
    const listExplore = [
        {
            title: "QUADRO",
            img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2Fexplore%2Fexoplore_1.jpg?alt=media&token=c1de3f38-6c13-4584-be5c-dbea701a10ca",
        },
        {
            title: "PETITE",
            img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2Fexplore%2Fexplore_2.jpg?alt=media&token=19ec4569-b145-490f-9876-e2348ab9558c",
        },
        {
            title: "CLASSIC",
            img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2Fexplore%2Fexplore_3.jpg?alt=media&token=9d62399b-6db2-441b-b768-0e34f2140517",
        },
        {
            title: "ICONIC",
            img: "https://firebasestorage.googleapis.com/v0/b/learnfirebase-78fd0.appspot.com/o/images%2Fexplore%2Fexplore_4.jpg?alt=media&token=6c3990cd-051c-4d74-be30-e62bee817616",
        }
    ]
    return (
        <div>
            <div className='bigTitle'>FIND THE PERFECT WATCH TO GO WITH YOUR FREE ACCESSORY</div>
            <div className='smallTitle'>Choose between Petite, Classic, Quadro or Iconic</div>
            <div className='Explore'>
                {listExplore.map((item) => (
                    <div className='mainExplore'>
                        <div >
                            <div className='titleExplore'>{item.title}</div>
                            <div className="bg-image hover-zoom imageExplore">
                                <img
                                    src={item.img}
                                    className="w-100"
                                />
                            </div>
                            <div className='textExplore'>
                                EXPLORE
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        
        </div>

    )
}
