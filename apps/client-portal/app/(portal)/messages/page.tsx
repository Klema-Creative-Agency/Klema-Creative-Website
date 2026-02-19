"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

interface Thread {
  id: string;
  subject: string;
  body: string;
  sender_name: string;
  sender_role: string;
  status: string;
  reply_count: number;
  last_reply_at: string;
  created_at: string;
}

interface Reply {
  id: string;
  body: string;
  sender_name: string;
  sender_role: string;
  created_at: string;
}

export default function MessagesPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyText, setReplyText] = useState("");
  const [showCompose, setShowCompose] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newBody, setNewBody] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => r.json())
      .then((data) => {
        setThreads(data);
        setLoading(false);
      });
  }, []);

  async function loadReplies(threadId: string) {
    setSelectedThread(threadId);
    const res = await fetch(`/api/messages/${threadId}/replies`);
    const data = await res.json();
    setReplies(data);

    // Mark as read
    await fetch(`/api/messages/${threadId}/read`, { method: "PATCH" });
  }

  async function sendReply() {
    if (!replyText.trim() || !selectedThread) return;
    await fetch(`/api/messages/${selectedThread}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: replyText }),
    });
    setReplyText("");
    loadReplies(selectedThread);
  }

  async function sendNewMessage() {
    if (!newSubject.trim() || !newBody.trim()) return;
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: newSubject, body: newBody }),
    });
    setNewSubject("");
    setNewBody("");
    setShowCompose(false);
    // Refresh threads
    const res = await fetch("/api/messages");
    setThreads(await res.json());
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  if (loading) {
    return <div className="text-text-dim text-[14px]">Loading messages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold text-text">Messages</h1>
        <Button onClick={() => setShowCompose(!showCompose)}>
          {showCompose ? "Cancel" : "New Message"}
        </Button>
      </div>

      {/* Compose */}
      {showCompose && (
        <Card>
          <CardHeader>
            <CardTitle>New Message</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            <Input
              placeholder="Subject"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
            />
            <Textarea
              placeholder="Write your message..."
              rows={4}
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
            />
            <Button onClick={sendNewMessage}>Send Message</Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thread List */}
        <div className="lg:col-span-1 space-y-2">
          {threads.length === 0 ? (
            <Card>
              <p className="text-[14px] text-text-dim text-center py-8">No messages yet</p>
            </Card>
          ) : (
            threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => loadReplies(thread.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  selectedThread === thread.id
                    ? "bg-card-hover border-accent/20"
                    : "bg-card border-border hover:bg-card-hover"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-[13px] font-medium text-text line-clamp-1">
                    {thread.subject || "No subject"}
                  </p>
                  {thread.status === "unread" && (
                    <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-[12px] text-text-dim line-clamp-1 mb-2">{thread.body}</p>
                <div className="flex items-center gap-2 text-[11px] text-text-muted">
                  <span>{thread.sender_name}</span>
                  <span>&middot;</span>
                  <span>{formatDate(thread.last_reply_at || thread.created_at)}</span>
                  {thread.reply_count > 0 && (
                    <>
                      <span>&middot;</span>
                      <span>{thread.reply_count} replies</span>
                    </>
                  )}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Thread Detail */}
        <div className="lg:col-span-2">
          {selectedThread ? (
            <Card>
              <div className="space-y-4 max-h-[500px] overflow-y-auto mb-4">
                {replies.map((reply) => (
                  <div
                    key={reply.id}
                    className={`p-4 rounded-xl ${
                      reply.sender_role === "client" ? "bg-accent-dim/30 ml-8" : "bg-surface mr-8"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[13px] font-medium text-text">
                        {reply.sender_name}
                      </span>
                      <Badge variant={reply.sender_role === "client" ? "accent" : "info"}>
                        {reply.sender_role}
                      </Badge>
                      <span className="text-[11px] text-text-muted ml-auto">
                        {formatDate(reply.created_at)}
                      </span>
                    </div>
                    <p className="text-[14px] text-text leading-relaxed whitespace-pre-wrap">
                      {reply.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Reply input */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Textarea
                  placeholder="Type a reply..."
                  rows={2}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={sendReply} className="self-end">
                  Send
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="flex items-center justify-center py-20">
              <p className="text-[14px] text-text-dim">Select a conversation to view</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
