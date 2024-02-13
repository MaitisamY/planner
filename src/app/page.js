/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState, useEffect } from 'react'
import Main from './Components/Main'
import Popup from './Components/Popup'
import Feature from './Components/Feature'
import { useToDoFunctions } from './useToDoFunctions'
import './globals.css'
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
import { BsShare, BsPlusLg } from 'react-icons/bs'

export default function Home() {
    const {
      tasks,
      popup,
      features,
      notifications,
      views,
      shareUrl,
      shareMessage,
      setPopup,
      setFeatures,
      handleViews,
      addTask,
      markTask,
      deleteTask,
      editTask,
      reCreateTask,
      handleOutsidePopupClick,
      handleOutsideFeatureClick
    } = useToDoFunctions();

    // localStorage.removeItem('tasks');
    return (
        <>
            {popup && (
                <Popup 
                    closePopup={() => setPopup(false)} 
                    addTask={addTask} 
                    handleOutsidePopupClick={handleOutsidePopupClick} 
                />
            )}
            {features && (
                <Feature
                    closeFeatures={() => setFeatures(false)}
                    handleOutsideFeatureClick={handleOutsideFeatureClick}
                />
            )}
            <Main
                tasks={tasks}
                addNewTask={() => setPopup(!popup)}
                showFeatures={() => setFeatures(!features)}
                addTask={addTask}
                markTask={markTask}
                deleteTask={deleteTask}
                editTask={editTask}
                reCreateTask={reCreateTask}
                views={views}
                handleViews={handleViews}
            > 
            </Main>
            <div className="share-buttons-mobile">
                <span title="Share our app on social media"><BsShare /></span>
                <FacebookShareButton url={shareUrl} quote={shareMessage}>
                    <FacebookIcon title="Share on Facebook" className="fb" size={25} />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={shareMessage}>
                    <TwitterIcon title="Share on Twitter" className="tw" size={25} />
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl} summary={shareMessage}>
                    <LinkedinIcon title="Share on LinkedIn" className="in" size={25} />
                </LinkedinShareButton>
                <WhatsappShareButton url={shareUrl} title={shareMessage}>
                    <WhatsappIcon title="Share on WhatsApp" className="wa" size={25} />
                </WhatsappShareButton>
            </div>
            <a 
                title="Create Task"
                onClick={() => setPopup(!popup)}
                className="create-task-btn-mobile"
            >
                <BsPlusLg />
            </a>
            {notifications.length > 0 && (
              <div className="notification-container">{notifications}</div>
            )}
            <div className="if-size-less-than-300">
                <p>Sorry! We do not support mobile devices less than 300 pixels wide.</p>
            </div>
        </>
    );
}
