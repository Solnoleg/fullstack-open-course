const Header = ({header}) => <h1>{header}</h1>

const Content = ({parts}) => (
    <div>
        {parts.map(part => <Part part={part} key={part.id}/>)}
    </div>
)

const Part = ({part}) => (
    <p>
        {part.name} {part.exercises}
    </p>
)

const Total = ({parts}) =>
    <h3>
        total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
    </h3>

const Course = ({course}) => {
    return (
        <div>
            <Header header={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course