import React from 'react'

import TagsList from './TagsList'
import LeftSidebar from '../../components/leftsidebar/LeftSidebar'
import './Tags.css'

const Tags = () => {
    const tagsList=[{
        id:1,
        tagName:"JavaScript",
        tagDesc:"JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat."
    },{
        id:2,
        tagName:"python",
        tagDesc:"Python is a computer programming language often used to build websites and software, automate tasks, and conduct data analysis. Python is a general-purpose language, meaning it can be used to create a variety of different programs and isn't specialized for any specific problems."
    },{
        id:3,
        tagName:"c#",
        tagDesc:"C# (pronounced \"See Sharp\") is a modern, object-oriented, and type-safe programming language. C# enables developers to build many types of secure and robust applications that run in . NET. C# has its roots in the C family of languages and will be immediately familiar to C, C++, Java, and JavaScript programmers."
    },{
        id:4,
        tagName:"java",
        tagDesc:"Java is a popular programming language, created in 1995. It is owned by Oracle, and more than 3 billion devices run Java. It is used for: Mobile applications (specially Android apps)"
    },{
        id:5,
        tagName:"html",
        tagDesc:"The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript. Open format?"
    },{
        id:6,
        tagName:"android",
        tagDesc:"Android software development is the process by which applications are created for devices running the Android operating system. Google states that \"Android apps can be written using Kotlin, Java, and C++ languages\" using the Android software development kit (SDK), while using other languages is also possible."
    },{
        id:7,
        tagName:"php",
        tagDesc:"What is PHP? PHP is an acronym for \"PHP: Hypertext Preprocessor\" PHP is a widely-used, open source scripting language. PHP scripts are executed on the server. PHP is free to download and use."
    },{
        id:8,
        tagName:"css",
        tagDesc:"CSS is the acronym for Cascade Styling Sheets. In short, it is a sheet style language, which is a type of language you can use to describe the presentation of a markup language – in this case, to describe the movements of HTML."
    },{
        id:9,
        tagName:"Reactjs",
        tagDesc:"React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”. We'll get to the funny XML-like tags soon. We use components to tell React what we want to see on the screen."
    },{
        id:10,
        tagName:"node.js",
        tagDesc:"Node. js brings event-driven programming to web servers, enabling development of fast web servers in JavaScript. Developers can create scalable servers without using threading, by using a simplified model of event-driven programming that uses callbacks to signal the completion of a task."
    }
    ]
  return (
    <div className='home-container-1' >
            <LeftSidebar />
            <div className="home-container-2">
                <h1 className='tags-h1'>Tags</h1>
                <p className='tags-p'>A Tag is a keyword or label that catagorisesyour question with other ,similar question.</p>
                <p className='tags-p'>Usign the right tag makes it easer for others to find and answer your question.</p>
                <div className="tags-list-container">
                    {
                        tagsList.map((tag)=>(
                            <TagsList tag={tag} key={tag.id}/>
                        ))
                    }
                </div>
            </div>
        </div>
  )
}

export default Tags
