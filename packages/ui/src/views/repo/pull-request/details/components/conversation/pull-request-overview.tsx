import { useMemo, useState } from 'react'
import { Avatar, AvatarFallback, Icon, Layout, MarkdownViewer, Text } from '@components/index'
import { PullRequestCommentBox, TranslationStore } from '@views/index'
import PullRequestDiffViewer from '@views/repo/pull-request/components/pull-request-diff-viewer'
import { isCodeComment, isComment, isSystemComment, removeLastPlus } from '../../pull-request-utils'
// import { PullRequestStatusSelect } from './pull-request-status-select-button'
  handleUpdateComment: (id: number, comment: string) => void
  useTranslationStore: () => TranslationStore
  handleDeleteComment: (id: number) => void

  onCopyClick: (commentId?: number) => void

  currentUser,
  handleDeleteComment,
  handleUpdateComment,
  useTranslationStore,
  onCopyClick
  const { t } = useTranslationStore()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  const [editModes, setEditModes] = useState<{ [key: string]: boolean }>({})
  const [editComments, setEditComments] = useState<{ [key: string]: string }>({})
  const [hideReplyBoxes, setHideReplyBoxes] = useState<{ [key: string]: boolean }>({})

  const toggleEditMode = (id: string, initialText: string) => {
    setEditModes(prev => ({ ...prev, [id]: !prev[id] }))
    if (!editModes[id]) {
      setEditComments(prev => ({ ...prev, [id]: initialText }))
    }
  }

  const toggleReplyBox = (state: boolean, id?: number) => {
    console.log(id, state)
    if (id === undefined) {
      console.error('toggleEditMode called with undefined id')
      return
    }
    setHideReplyBoxes(prev => ({ ...prev, [id]: state }))
  }

                  payload?.id && (
                    <PullRequestTimelineItem
                      hideReplyBox={hideReplyBoxes[payload?.id]}
                      setHideReplyBox={state => toggleReplyBox(state, payload?.id)}
                      key={payload?.id}
                      currentUser={currentUser?.display_name}
                      replyBoxClassName="p-4"
                      header={[
                        {
                          avatar: (
                            <Avatar className="size-6 rounded-full p-0">
                              {/* <AvatarImage src={AvatarUrl} /> */}

                              <AvatarFallback>
                                <Text size={1} color="tertiaryBackground">
                                  {/* TODO: fix fallback string */}
                                  {getInitials((payload?.author as PayloadAuthor)?.display_name || '')}
                                </Text>
                              </AvatarFallback>
                            </Avatar>
                          ),
                          name: (payload?.author as PayloadAuthor)?.display_name,
                          // TODO: fix comment to tell between comment or code comment?
                          description: payload?.created && `reviewed ${timeAgo(payload?.created)}`
                        }
                      ]}
                      content={
                        <div className="flex flex-col pt-2">
                          <div className="flex w-full items-center justify-between px-4 pb-2">
                            <Text size={3} color="primary">
                              {(payload?.code_comment as PayloadCodeComment)?.path}
                            </Text>
                            <div className="flex items-center gap-x-2">
                              {/* TODO: fix states on this on a comment like resolved and active */}
                              {/* <PullRequestStatusSelect
                              refetchActivities={refetchActivities}
                              commentStatusPullReq={commentStatusPullReq}
                              comment={{ commentItems: commentItems }}
                              pullReqMetadata={pullReqMetadata}
                              repoId={repoId}
                            /> */}
                              {/* TODO: add on click or other menu options */}
                            </div>
                          </div>
                          {startingLine ? (
                            <div className="bg-[--diff-hunk-lineNumber--]">
                              <div className="ml-16 w-full px-8 py-1 font-mono">{startingLine}</div>
                            </div>
                          ) : null}

                          <PullRequestDiffViewer
                            data={removeLastPlus(codeDiffSnapshot)}
                            fileName={payload?.code_comment?.path ?? ''}
                            lang={(payload?.code_comment?.path && payload?.code_comment?.path.split('.').pop()) || ''}
                            fontsize={fontsize}
                            highlight={highlight}
                            mode={DiffModeEnum.Unified}
                            wrap={wrap}
                            addWidget={false}
                            useTranslationStore={useTranslationStore}
                          />
                          <div className="px-4 py-2">
                            {commentItems?.map((commentItem, idx) => {
                              const componentId = `activity-code-${commentItem?.id}`

                              return (
                                payload?.id && (
                                  <PullRequestTimelineItem
                                    hideReplyBox={hideReplyBoxes[payload?.id]}
                                    setHideReplyBox={state => toggleReplyBox(state, payload?.id)}
                                    parentCommentId={payload?.id}
                                    titleClassName="!flex max-w-full"
                                    icon={
                                      <Avatar className="size-6 rounded-full p-0">
                                        {/* <AvatarImage src={AvatarUrl} /> */}

                                        <AvatarFallback>
                                          <Text size={1} color="tertiaryBackground">
                                            {/* TODO: fix fallback string */}
                                            {getInitials(
                                              ((commentItem as TypesPullReqActivity)?.payload?.author as PayloadAuthor)
                                                ?.display_name || ''
                                            )}
                                          </Text>
                                        </AvatarFallback>
                                      </Avatar>
                                    }
                                    isComment
                                    onCopyClick={onCopyClick}
                                    commentId={commentItem.id}
                                    isLast={commentItems.length - 1 === idx}
                                    header={[
                                      {
                                        name: ((commentItem as TypesPullReqActivity)?.payload?.author as PayloadAuthor)
                                          ?.display_name,
                                        // TODO: fix comment to tell between comment or code comment?
                                        description: (
                                          <Layout.Horizontal>
                                            <span className="text-foreground-3">
                                              {timeAgo((commentItem as PayloadCreated)?.created)}
                                            </span>
                                            {commentItem?.deleted ? (
                                              <>
                                                <span className="text-foreground-3">&nbsp;|&nbsp;</span>
                                                <span className="text-foreground-3">
                                                  {t('views:pullRequests.deleted')}{' '}
                                                </span>
                                              </>
                                            ) : null}
                                          </Layout.Horizontal>
                                        )
                                      }
                                    ]}
                                    hideReply
                                    isDeleted={!!commentItem?.deleted}
                                    handleDeleteComment={() => handleDeleteComment(commentItem?.id)}
                                    onEditClick={() =>
                                      toggleEditMode(componentId, commentItem?.payload?.payload?.text || '')
                                    }
                                    contentClassName="border-transparent"
                                    replyBoxClassName="p-4"
                                    content={
                                      commentItem?.deleted ? (
                                        <div className="rounded-md border bg-primary-background p-1">
                                          {t('views:pullRequests.deletedComment')}
                                        </div>
                                      ) : editModes[componentId] ? (
                                        <PullRequestCommentBox
                                          inReplyMode
                                          isEditMode
                                          onSaveComment={() => {
                                            if (commentItem?.id) {
                                              handleUpdateComment?.(commentItem?.id, editComments[componentId])
                                              toggleEditMode(componentId, '')
                                            }
                                          }}
                                          currentUser={currentUser?.display_name}
                                          onCancelClick={() => {
                                            toggleEditMode(componentId, '')
                                          }}
                                          comment={editComments[componentId]}
                                          setComment={text =>
                                            setEditComments(prev => ({ ...prev, [componentId]: text }))
                                          }
                                        />
                                      ) : (
                                        <MarkdownViewer source={commentItem?.payload?.payload?.text || ''} />
                                      )
                                    }
                                    key={`${commentItem.id}-${commentItem.author}`}
                                  />
                                )
                              )
                            })}
                          </div>
                        </div>
                        //
                      }
                      icon={<Icon name="pr-review" size={12} />}
                      isLast={(data && data?.length - 1 === index) ?? false}
                      handleSaveComment={handleSaveComment}
                      parentCommentId={payload?.id}
                    />
                  )
                )
              }
              return (
                payload?.id && (
                    hideReplyBox={hideReplyBoxes[payload?.id]}
                    setHideReplyBox={state => toggleReplyBox(state, payload?.id)}
                    key={payload?.id}
                    titleClassName="!flex max-w-full"
                        description: (
                          <div className="flex space-x-4">
                            <div className="pr-2">{payload?.created && `commented ${timeAgo(payload?.created)}`} </div>
                          </div>
                        )
                        // selectStatus: (
                        //   <div className="flex items-center gap-x-2">
                        //     <PullRequestStatusSelect
                        //       refetchActivities={refetchActivities}
                        //       commentStatusPullReq={commentStatusPullReq}
                        //       comment={{
                        //         commentItems: commentItems
                        //       }}
                        //       pullReqMetadata={pullReqMetadata}
                        //       repoId={repoId}
                        //     />
                        //   </div>
                        // )
                    currentUser={currentUser?.display_name}
                    replyBoxClassName="p-4"
                      <div className="px-4 pt-4">
                        {commentItems?.map((commentItem, idx) => {
                          const componentId = `activity-comment-${commentItem?.id}`
                          return (
                            payload?.id && (
                                hideReplyBox={hideReplyBoxes[payload?.id]}
                                setHideReplyBox={state => toggleReplyBox(state, payload?.id)}
                                parentCommentId={payload?.id}
                                titleClassName="!flex max-w-full"
                                currentUser={currentUser?.display_name}
                                            .display_name || ''
                                    description: (
                                      <Layout.Horizontal>
                                        <span className="text-foreground-3">
                                          {timeAgo((commentItem as PayloadCreated)?.created)}
                                        </span>
                                        {commentItem?.deleted ? (
                                          <>
                                            <span className="text-foreground-3">&nbsp;|&nbsp;</span>
                                            <span className="text-foreground-3">
                                              {t('views:pullRequests.deleted')}{' '}
                                            </span>
                                          </>
                                        ) : null}
                                      </Layout.Horizontal>
                                    )
                                isComment
                                onCopyClick={onCopyClick}
                                commentId={commentItem.id}
                                isDeleted={!!commentItem?.deleted}
                                handleDeleteComment={() => handleDeleteComment(commentItem?.id)}
                                onEditClick={() =>
                                  toggleEditMode(componentId, commentItem?.payload?.payload?.text || '')
                                }
                                contentClassName="border-transparent pb-0"
                                replyBoxClassName="p-4"
                                  commentItem?.deleted ? (
                                    <div className="rounded-md border bg-primary-background p-1">
                                      {t('views:pullRequests.deletedComment')}
                                    </div>
                                  ) : editModes[componentId] ? (
                                    <PullRequestCommentBox
                                      inReplyMode
                                      isEditMode
                                      onSaveComment={() => {
                                        if (commentItem?.id) {
                                          handleUpdateComment?.(commentItem?.id, editComments[componentId])
                                          toggleEditMode(componentId, '')
                                        }
                                      }}
                                      currentUser={currentUser?.display_name}
                                      onCancelClick={() => {
                                        toggleEditMode(componentId, '')
                                      }}
                                      comment={editComments[componentId]}
                                      setComment={text => setEditComments(prev => ({ ...prev, [componentId]: text }))}
                                    />
                                  ) : (
                                    <MarkdownViewer source={commentItem?.payload?.payload?.text || ''} />
                                  )
                                key={`${commentItem.id}-${commentItem.author}-pr-comment`}
                          )
                        })}
                    icon={<Icon name="pr-comment" size={12} />}
                    isLast={activityBlocks.length - 1 === index}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data,
    handleSaveComment,
    pullReqMetadata,
    activityFilter,
    currentUser,
    editModes,
    editComments,
    handleUpdateComment,
    hideReplyBoxes
  ])