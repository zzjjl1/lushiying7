import React, { Component } from "react";
import { Instance } from '../../common/request'
import {
    Card,
    Modal,
    Input,
    message,
    Tag,
    Button
} from 'antd'
const HOTWORDS = [
    'key1',
    'key2',
    'key3',
    'key4'
]
import './trace.less'

let TRACEID = 1

export default class Trace extends Component {
    constructor() {
        super();
        this.state = {
            traceList: [],
            tagList: [],
            selectedWord: '',
            visible: false,
            inputValue: '',
            isModify: false,
            isAddingNewTag: false
        }
        this.InputRef = null
        this.tagNameRef = null
    }
    componentDidMount() {
        Instance.get('/api/followup/selection').then(data => {
            let list = data.data.data
            const tagList = this.state.tagList
            this.setState({
                tagList: [...tagList, ...list]
            })
        })
    }
    handleCancelTagName() {
        this.setState({
            isAddingNewTag: false
        })
        this.tagNameRef.setValue('')
    }
    handleSaveTagName() {
        let inputValue = this.tagNameRef.state.value
        if (inputValue && inputValue.trim()) {
            const tagName = inputValue.trim()
            this.setState({
                isAddingNewTag: false,
                tagList: [...this.state.tagList, tagName]
            })
        } else {
            message.warn('请输入合法的标签名')
        }

    }
    onSelectHotWord(selectedWord) {
        this.setState({
            selectedWord,
            visible: true,
            isModify: false
        })
    }
    handleSave() {
        let content = {}
        this.state.traceList.forEach(trace => content[trace.key] = trace.value)
        content = JSON.stringify(content)
        const data = {
            ucid: '26025530',
            house_code: '111111',
            content
        }
        Instance.post('/api/followup/add', data).then(msg => {
            console.log(msg, '新增跟进反馈')
            if (msg.data.errno === 0) {
                message.success('新增成功')
                this.props.onSucess && this.props.onSucess()
            }
        })
    }
    deleteTrace(id) {
        const traceList = this.state.traceList
        this.setState({
            traceList: traceList.filter(trace => trace.id !== id)
        })
    }
    handleOk() {
        let inputValue = this.InputRef.state.value
        if (inputValue && inputValue.trim()) {
            const msg = inputValue.trim()
            const selectedWord = this.state.selectedWord
            const traceList = this.state.traceList

            let resultTraceList = []
            const isHasTheWord = traceList.some(trace => trace.key === selectedWord)

            if (this.state.isModify || isHasTheWord) {
                resultTraceList = traceList.map(trace => trace.key === selectedWord ? { ...trace, value: msg } : trace)
            } else {
                const newTrace = {
                    key: this.state.selectedWord,
                    value: msg,
                    id: TRACEID++
                }
                resultTraceList = [...traceList, newTrace]
            }

            this.setState({
                traceList: resultTraceList,
                visible: false,
                selectedWord: ''
            })
        } else {
            message.warn('请输入合法的信息')
        }
        this.InputRef.setValue('')
    }
    handleCancel() {
        this.setState({
            visible: false
        })
    }
    handleModify(id) {
        const traceList = this.state.traceList
        const selectTrace = traceList.filter(trace => trace.id === id)[0]
        this.setState({
            visible: true,
            isModify: true,
            selectedWord: selectTrace.key
        })
        this.InputRef.setValue(selectTrace.value)
    }
    render() {
        const isShowAddButton = this.state.traceList.length !== 0
        const isAddingNewTag = this.state.isAddingNewTag
        const tagList = this.state.tagList
        const { selectedWord } = this.state
        return (
            <div className="trace">
                <Card>
                    <div className="trace-hot-words-wrapper">
                        {tagList.map(word => {
                            return (
                                <span className="trace-hot-word" onClick={() => { this.onSelectHotWord(word) }} key={word}>{word}</span>
                            )
                        })}
                        {
                            isAddingNewTag ? (
                                <div>
                                    <Input ref={ref => this.tagNameRef = ref} style={{ width: '130px' }} className="trace-m-r-5" size="small"></Input>
                                    <Button shape="circle" size="small" onClick={() => this.handleSaveTagName()} className="trace-m-r-5">√</Button>
                                    <Button shape="circle" size="small" onClick={() => this.handleCancelTagName()}>×</Button>
                                </div>
                            ) : (
                                    <Button shape="circle" size="small" onClick={() => this.setState({ isAddingNewTag: true })}>+</Button>
                                )
                        }
                    </div>
                    <div className="trace-list">
                        {
                            this.state.traceList.map(trace => {
                                return (
                                    <Tag color="magenta" key={trace.id} closable onClose={() => this.deleteTrace(trace.id)}>
                                        <span style={{ color: 'black', cursor: 'pointer', fontSize: '16px' }} onClick={() => this.handleModify(trace.id)}>{trace.key + ' : ' + trace.value}</span>
                                    </Tag>
                                )
                            })
                        }
                    </div>
                    <div className="trace-operation">
                        {isShowAddButton ? (
                            <Button onClick={() => this.handleSave()} type="primary">保存</Button>
                        ) : null}
                    </div>
                </Card>
                <Modal
                    title="输入跟进信息"
                    cancelText="取消"
                    okText="确认"
                    visible={this.state.visible}
                    onOk={() => { this.handleOk() }}
                    onCancel={() => { this.handleCancel() }}
                >
                    <Input ref={(ref) => this.InputRef = ref} addonBefore={selectedWord + ':'} style={{ width: '400px' }}></Input>
                </Modal>
            </div>
        )
    }
}