@genType let ok = v => Ok(v)
@genType let error = e => Error(e)

@genType let getExn = RescriptCore.Result.getExn
@genType let mapOr = RescriptCore.Result.mapOr
@genType let map = RescriptCore.Result.map
@genType let flatMap = RescriptCore.Result.flatMap
@genType let getOr = RescriptCore.Result.getOr
@genType let isOk = RescriptCore.Result.isOk
@genType let isError = RescriptCore.Result.isError
@genType let equal = RescriptCore.Result.equal
@genType let compare = RescriptCore.Result.compare
@genType let forEach = RescriptCore.Result.forEach
@genType let mapError = RescriptCore.Result.mapError
