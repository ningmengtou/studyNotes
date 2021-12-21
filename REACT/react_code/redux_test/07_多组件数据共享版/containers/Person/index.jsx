import React, { Component } from 'react'
import { connect } from 'react-redux'
import { nanoid } from 'nanoid'
import { addPersonAction } from '../../redux/actions/person'
import presonReducer from '../../redux/reducers/person'


class Person extends Component {

    addPerson = () => {
        const name = this.name.value
        const age = this.age.value
        const personObj = { id: nanoid(), name, age }
        this.props.add(personObj)
        this.name.value = ''
        this.age.value = ''
    }

    render() {
        return (
            <div>
                <h2>我是Person组件,上方组件求和为:{this.props.count}</h2>
                <input type="text" ref={c => this.name = c} placeholder="输入姓名" />
                <input type="text" ref={c => this.age = c} placeholder="输入年龄" />
                <button onClick={this.addPerson}>添加成员</button>
                <ul>
                    {
                        this.props.personList.map(person => {
                            return (
                                <li key={person.id}>姓名：{person.name}-年龄:{person.age}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default connect(
    state => ({
        personList: state.persons,
        count: state.count
    }),
    {
        add: addPersonAction
    }
)(Person)
