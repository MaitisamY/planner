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

    const shareUrl = 'https://next-to-do-app-nu.vercel.app/';
    const shareMessage = `I use this app to maintain my daily tasks. Check out the app At:`;

    return (
        <div className="welcome">
            <h2>
                Welcome
            </h2>
            <h3>PLANNER is a simple and easy to use daily tasks maintainer app.</h3>
            <button onClick={addNewTask} className="create-task">
                Create Task
            </button>
            <h4>Kindly share our app on social media</h4>
            <div className="share-buttons">
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