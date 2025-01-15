import { Avatar, AvatarFallback, Icon, Layout, Text } from '@components/index'
import { CommitSuggestion, TypesPullReq } from '@views/repo/pull-request/pull-request.types'
import PRCommentView from '../common/pull-request-comment-view'
  handleUpload: (blob: File, setMarkdownContent: (data: string) => void) => void
  onCommentSaveAndStatusChange?: (comment: string, status: string, parentId?: number) => void
  suggestionsBatch: CommitSuggestion[]
  onCommitSuggestion: (suggestion: CommitSuggestion) => void
  addSuggestionToBatch: (suggestion: CommitSuggestion) => void
  removeSuggestionFromBatch: (commentId: number) => void
  filenameToLanguage: (fileName: string) => string | undefined
  toggleConversationStatus: (status: string, parentId?: number) => void
  onCopyClick,
  handleUpload,
  onCommentSaveAndStatusChange,
  suggestionsBatch,
  onCommitSuggestion,
  addSuggestionToBatch,
  removeSuggestionFromBatch,
  filenameToLanguage,
  toggleConversationStatus
              const parentIdAttr = `comment-${payload?.id}`

                      handleUpload={handleUpload}
                      data={payload?.text as string}
                      isNotCodeComment
                      id={parentIdAttr}
                      toggleConversationStatus={toggleConversationStatus}
                      onCommentSaveAndStatusChange={onCommentSaveAndStatusChange}
                      isResolved={!!payload?.resolved}
                            handleUpload={handleUpload}
                              const commentIdAttr = `comment-${payload?.id}`
                                    handleUpload={handleUpload}
                                    id={commentIdAttr}
                                    data={commentItem.payload?.payload?.text as string}
                                    isNotCodeComment
                                              (
                                                (commentItem as unknown as TypesPullReqActivity)?.payload
                                                  ?.author as PayloadAuthor
                                              )?.display_name || ''
                                        name: (
                                          (commentItem as unknown as TypesPullReqActivity)?.payload
                                            ?.author as PayloadAuthor
                                        )?.display_name,
                                              {timeAgo((commentItem as unknown as PayloadCreated)?.created)}
                                    toggleConversationStatus={toggleConversationStatus}
                                    onCommentSaveAndStatusChange={onCommentSaveAndStatusChange}
                                          handleUpload={handleUpload}
                                          isResolved={!!payload?.resolved}
                                          onCommentSaveAndStatusChange={onCommentSaveAndStatusChange}
                                          parentCommentId={payload?.id}
                                        <PRCommentView
                                          commentItem={commentItem}
                                          filenameToLanguage={filenameToLanguage}
                                          suggestionsBatch={suggestionsBatch}
                                          onCommitSuggestion={onCommitSuggestion}
                                          addSuggestionToBatch={addSuggestionToBatch}
                                          removeSuggestionFromBatch={removeSuggestionFromBatch}
                                        />
                    handleUpload={handleUpload}
                    data={payload?.text as string}
                    id={parentIdAttr}
                    isResolved={!!payload?.resolved}
                    toggleConversationStatus={toggleConversationStatus}
                    onCommentSaveAndStatusChange={onCommentSaveAndStatusChange}
                          // const diffCommentItem = activitiesToDiffCommentItems(commentItem)
                          const commentIdAttr = `comment-${payload?.id}`
                                handleUpload={handleUpload}
                                id={commentIdAttr}
                                data={commentItem.payload?.payload?.text as string}
                                toggleConversationStatus={toggleConversationStatus}
                                onCommentSaveAndStatusChange={onCommentSaveAndStatusChange}
                                          (
                                            (commentItem as unknown as TypesPullReqActivity)?.payload
                                              ?.author as PayloadAuthor
                                          ).display_name || ''
                                    name: (
                                      (commentItem as unknown as TypesPullReqActivity)?.payload?.author as PayloadAuthor
                                    )?.display_name,
                                          {timeAgo((commentItem as unknown as PayloadCreated)?.created)}
                                      handleUpload={handleUpload}
                                      isResolved={!!payload?.resolved}
                                      onCommentSaveAndStatusChange={onCommentSaveAndStatusChange}
                                      parentCommentId={payload?.id}
                                    <PRCommentView
                                      commentItem={commentItem}
                                      filenameToLanguage={filenameToLanguage}
                                      suggestionsBatch={suggestionsBatch}
                                      onCommitSuggestion={onCommitSuggestion}
                                      addSuggestionToBatch={addSuggestionToBatch}
                                      removeSuggestionFromBatch={removeSuggestionFromBatch}
                                    />