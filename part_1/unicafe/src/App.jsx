import {useState} from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Feedback = ({text, count}) => {
    return (
        <div>{text} {count}</div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h2>give feedback</h2>
            <div>
                <Button onClick={() => {
                    setGood(good + 1)
                }} text="good"/>
                <Button onClick={() => {
                    setNeutral(neutral + 1)
                }} text="neutral"/>
                <Button onClick={() => {
                    setBad(bad + 1)
                }} text="bad"/>
            </div>
            <h2>statistics</h2>
            <Feedback text="good" count={good} />
            <Feedback text="neutral" count={neutral} />
            <Feedback text="bad" count={bad} />
        </div>
    )
}

export default App