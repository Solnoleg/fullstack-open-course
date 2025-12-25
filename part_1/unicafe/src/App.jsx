import {useState} from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Feedback = ({text, count}) => {
    return (
        <div>{text} {count}</div>
    )
}

const Average = ({good, neutral, bad}) => {
    const score = {
        good: 1,
        neutral: 0,
        bad: -1
    }

    const sum = good + neutral + bad
    let average = 0
    if (sum !== 0) {
        average = (score.good * good + score.neutral * neutral + score.bad * bad) / sum
    }

    return (
        <div>
            average {average}
        </div>
    )
}

const Positive = ({good, neutral, bad}) => {
    const sum = good + neutral + bad
    let positive = 0
    if (sum !== 0) {
        positive = good / sum
    }

    return (
        <div>
            positive {positive}
        </div>
    )
}

const Statistics = ({good, neutral, bad}) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <p>
                No feedback given
            </p>
        )
    }

    return (
        <div>
            <h2>statistics</h2>
            <Feedback text="good" count={good}/>
            <Feedback text="neutral" count={neutral}/>
            <Feedback text="bad" count={bad}/>
            <div>
                all {good + neutral + bad}
            </div>
            <Average good={good} neutral={neutral} bad={bad}/>
            <Positive good={good} neutral={neutral} bad={bad}/>
        </div>
    );
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
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App