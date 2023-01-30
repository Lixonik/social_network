export default interface Message {
  content:any,
  from:string,
  to:string,
  timestamp: string | null
  id:string | null
}
