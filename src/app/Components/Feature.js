export default function Feature({ closeFeatures, handleOutsideFeatureClick }) {
    return (
        <div id="feature" className="popup" onClick={(e) => handleOutsideFeatureClick(e)}>
            <div id="add-task" className="add-task">
                <a onClick={closeFeatures} className="close">&times;</a>
                <h2>
                    Features
                </h2>
                <ul>
                    <li>{`Maximum task's text limit is 100 words.`}</li>
                    <li>Tasks get moved to trash if due date is passed</li>
                    <li>The newer task will appear first</li>
                    <li>Task creation with date specification</li>
                    <li>Task can be marked or unmarked as completed or pending</li>
                    <li>Task editing</li>
                    <li>Task deletion</li>
                    <li>Due date can also be edited</li>
                </ul>
            </div>
        </div>
    )
}