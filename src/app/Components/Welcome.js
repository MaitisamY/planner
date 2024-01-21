import { useState } from 'react'
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon
  } from 'react-share'
  import { BsShare } from 'react-icons/bs'
export default function Welcome({ tasks, addNewTask }) {
    const [features, setFeatures] = useState(0)

    const shareUrl = 'https://next-to-do-app-nu.vercel.app/';
    const shareMessage = `I use this app to maintain my daily tasks. Check out the app At:`;

    return (
        <div className="welcome">
            <h2>
                Welcome
            </h2>
            <h3>A simple daily tasks maintainer app</h3>
            <h2>
                Features
            </h2>
            <ul>
                <li>{`Maximum task's text limit is 100 words.`}</li>
                <li>Tasks get moved to trash if due date is passed</li>
                <li>The newer task will appear first</li>
                {
                    features === 0 ? 
                    <a onClick={() => setFeatures(1)}>Show more</a> :
                    <>  
                        <li>Task creation with date specification</li>
                        <li>Task can be marked or unmarked as completed or pending</li>
                        <li>Task editing</li>
                        <li>Task deletion</li>
                        <li>Due date can also be edited</li>
                        <a onClick={() => setFeatures(0)}>Show less</a>
                    </>
                }
            </ul>
            <button onClick={addNewTask} className="create-task">
                {tasks.length === 0 ? 'Create your first task' : 'Create Task'}
            </button>
            <div className="share-buttons">
                <span title="Share our app on social media"><BsShare /></span>
                <FacebookShareButton url={shareUrl} quote={shareMessage}>
                    <FacebookIcon title="Share on Facebook" className="fb" size={28} />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={shareMessage}>
                    <TwitterIcon title="Share on Twitter" className="tw" size={28} />
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl} summary={shareMessage}>
                    <LinkedinIcon title="Share on LinkedIn" className="in" size={28} />
                </LinkedinShareButton>
                <WhatsappShareButton url={shareUrl} title={shareMessage}>
                    <WhatsappIcon title="Share on WhatsApp" className="wa" size={28} />
                </WhatsappShareButton>
            </div>
        </div>
    )
}