/**
 * Created by Administrator on 2017/6/16 0016.
 */
/*
 * mergeTable 0.1
 * Copyright (c) 2013 eastday  http://eastday.cnblogs.com/
 * Date: 2013-07-19
 * 使用mergetTable可以方便地将表格进行合并。
 * 参数说明：rowsToMerger 跨行合并列 cols:需要合并的列索引,从0开始,rows:[起始行-结束行],val:填充值
 colsToMerger 同行合并列 rows:需要合并的行索引,从0开始,cols:[起始列-结束列],val：填充值
 */
(function($){
    $.fn.mergeTable = function(options){
        var defaults = {
            rowsToMerger:[{cols:0,rows:[1,2],val:"rowsToMerger"}],
            colsToMerger:[{rows:0,cols:[1,2],val:"colsToMerger"}]
        }
        var options = $.extend(defaults, options);
        return  this.each(function(){
            //1.首先读取整个表格的内容..
            var gcolsNum=$(this).find("tr").eq(0).find("td").size();
            var growsNum=$(this).find("tr").size();

            //2.跨行合并列
            var rowsToMerger= options.rowsToMerger;
            //3.同行合并列
            var colsToMerger= options.colsToMerger;

            for(var j=0;j<rowsToMerger.length;j++)
            {
                setRowspan($(this),rowsToMerger[j].cols,rowsToMerger[j].rows,rowsToMerger[j].val);
            }

            for(var j=0;j<colsToMerger.length;j++)
            {
                setColspan($(this),colsToMerger[j].cols,colsToMerger[j].rows,colsToMerger[j].val)
            }
            //同行合并列
            function setColspan(obj,cols,rows,val)
            {
                var colstar=cols[0];
                var colsend=cols[1];
                var objtr=$(obj).find("tr").eq(rows);
                var curColsNum=objtr.find("td").size();

                var objtd;
                //如果没有合并过列
                if (gcolsNum==curColsNum){
                    objtd= objtr.find("td").eq(colstar).attr("colspan",colsend-colstar +1 );
                    //SET VALUE
                    if(val!="") {
                        objtr.find("td").eq(colstar).html(val);
                    }
                }else {
                    //合并过列以后,列需要重新计算
                    var colsdif=gcolsNum-curColsNum;
                    objtd= objtr.find("td").eq(colstar-colsdif).attr("colspan",colsend-colstar +1 );
                    //SET VALUE
                    objtr.find("td").eq(colstar-colsdif).html(val);
                }

                //移除合并以前的列
                for(var i=colstar+1;i<colsend+1;i++ )
                {
                    var colsDif= colsend - colstar;
                    if(gcolsNum==curColsNum){
                        objtr.find("td").eq(colstar+1).remove();
                    }else {
                        objtd.next().remove();
                    }
                }
            }
            //跨行合并列
            function setRowspan(obj,cols,rows,val)
            {
                //SET VARIABLE
                var rowstar=rows[0];
                var rowsend=rows[1];
                var objtr=$(obj).find("tr");

                var rowStarColsNum=parseInt(objtr.eq(rowstar).find("td").size());

                //SET ROWSPAN
                if(rowStarColsNum==parseInt(gcolsNum)) {

                    objtr.eq(rowstar).find("td").eq(cols).attr("rowspan",rowsend-rowstar +1 );
                    //SET VALUE
                    if(val!="") {
                        objtr.eq(rowstar).find("td").eq(cols).html(val);
                    }

                } else{
                    //相差的列数
                    var colsDif= gcolsNum - rowStarColsNum;
                    objtr.eq(rowstar).find("td").eq(cols-colsDif).attr("rowspan",rowsend-rowstar +1 );
                    if(val!="") {
                        objtr.eq(rowstar).find("td").eq(cols-colsDif).html(val);
                    }
                }
                //RMOVE TD
                for (var i=rowstar+1;i<rowsend+1;i++){

                    var curCols=parseInt(objtr.eq(i).find("td").size());

                    if (curCols==parseInt(gcolsNum))
                    {
                        objtr.eq(i).find("td").eq(cols).remove();

                    }else{
                        //相差的列数
                        var colsDif= gcolsNum - curCols;
                        objtr.eq(i).find("td").eq(cols-colsDif ).remove();
                    }
                }
            }
        });
    };
})(jQuery);