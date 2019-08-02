export default function toJsonObject(obj: object) {
    return JSON.parse(JSON.stringify(obj, (_key, value) => {
      if (value !== null) return value
    }))
  }