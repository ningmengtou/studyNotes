import React, { useState, useEffect } from "react";

import CommentView from "../CommentView";
import LoadMore from "../../../components/LoadMore"
import api from "../../../api"

const CommentList = (props) => {

    const [commentData, setCommentData] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        http()
    }, [])

    const http = () => {
        api.getComment({
            id: props.id
        }).then(res => {
            if (res.status === 200) {
                setCommentData([...commentData, ...res.data.commentData.data])
                setHasMore(res.data.commentData.hasMore)
            }
        })
    }

    const getMore = () => {
        http()
    }

    return (
        <div>
            {
                commentData.length > 0 ?
                    <CommentView data={commentData} /> :
                    <div>数据加载中...</div>
            }
            <LoadMore getMore={getMore} />
        </div>
    )
}

export default CommentList