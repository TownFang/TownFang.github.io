---
title: Golang笔记
abbrlink: 2711c7b8
date: 2022-11-26 16:25:49
tags:
---
# Golang笔记

# Go语言的概述

## 开发环境的搭建

SDK下载：[go1.17.5.windows-amd64.msi](https://golang.google.cn/dl/go1.17.5.windows-amd64.msi)  
开发工具下载：[Visual Studio Code](https://code.visualstudio.com/Download)  
手册：[官方手册](http://docscn.studygolang.com/)  
设计者：谷歌公司 罗伯特·格瑞史莫  
学习视频链接：`https://www.bilibili.com/video/BV1ME411Y71o?p=18`  
脑图链接地址：https://www.processon.com/view/link/5f2e48257d9c083149a58dc0  
学习目标

> 变量，数据类型，运算符，流程控制，函数，数组、切片，map，结构体、方法、面向对象
>

## 初始化项目

初始化项目的命令

```bash
go version
go mod init goLangProject
```

init后面是项目的名称，我的项目名称是 `goLangProject`。我使用的go的版本是 `go version go1.17.5 windows/amd64`，如果不进行init，会报错。

## 执行项目

Dos介绍：disk operating system 磁盘操作系统。

```bash
# 生成二进制执行文件
go build -o mydemo.exe hello.go
# 运行
 ./mydemo.exe
# 输出hello,world
# 直接运行
go run hello.go
```

`-o`用来对生成的二进制执行文件重命名。

# 变量

变量表示内存的一个存储区域，该区域有自己的名称和类型。变量=变量名+类型+值。类型可以省略，编译器会自动进行类型推导。第三种使用方式，省略var，`name := "tmo"`，使用冒号:。可以一次性声明多个变量`var n1, n2, n3 int`。还有一次性声明用来定义全局变量。

## 数据类型

### 值类型

介绍：基本数据类型int系列，float系列，bool，string，数组和结构体struct，在内存中通常分配到栈区。

### 引用类型

介绍：指针、slice切片、map、管道chan，interface等都是引用类型，在内存中通常分配到堆区。

> 定义变量：var a int = 10  
> 定义指针：var b *int  
> 取变量地址：&a  
> 将变量地址给指针变量：b = &a  
> 改变变量a的值 *b = *b + 10 // 将a的值改成了20 以指针的方式操作变量
>

基本数据类型：数值型、字符型、布尔型，字符串

> 数值型又分为整数类型和浮点类型，例如int，int8，int16，float32，float64等，其中8表示8位(bit)，代表一个字节(byte)，16代表16位，表示两个字节。UTF-8编码汉字占3个字节。1个字节的表数范围-128~127，8位中的第一位符号位（正负），因此2进制转10进制后是2的7次方到2的7次方减1。
>

无符号的数值型：例如uint8的表数位0~255(2的8次方减1)。int类型和unit类型的表数与系统有关，32位系统int就占4个字节，表数范围是-2的31次方到2的31次方减1。

浮点型：浮点型都是有符号位的

字符型：

```go
package main
import "fmt"
func main() {
  var c1 byte = 'a'
  var c2 byte = '0'
  fmt.Println("c1=",c1,"c2=",c2)
}
```

bool类型：

```go
package main
import (
  "fmt"
  "unsafe"
)
func main() {
  var b bool = false
  // bool类型占用的存储空间1byte
  fmt.Println("b的占用空间 = ",unsafe.Sizeof(b))
}
```

```go
package main
import "fmt"
func main() {
  var  i int = 1
  fmt.Println("i =",i)
  var j int8 = -128
  fmt.Println("j =",j)
  var k uint8 = 0
  fmt.Println("k =",k)
  // int unit rune byte 的使用
  var a int = 8900
  fmt.Println("a = ",a)
  var b uint = 1
  var c byte = 255 // uint8
  var d rune = 1 // int32
  fmt.Println("b=",b,"c=",c,"d=",d)
}
```

字符串：[GO语言标准库中文文档](https://studygolang.com/pkgdoc)，基本数据类型转字符串可以使用Sprintf函数。也可以使用strconv包中的FormatInt方法进行基本数据类型转string。同时也要了解string转基本数据类型。strconv包中的Itoa方法可以将int类型直接转成string

```go
package main
import (
  "fmt"
  _ "unsafe"
  "strconv"
)
func main(){
  var a int = 1
  // 将整型转成字符串
  var str string = fmt.Sprintf("%d",a)
  fmt.Printf("str的数据类型是%T\n",str)
  fmt.Printf("str的数据类型是%q\n",str)
  var a2 int = 90
  var str2 = strconv.FormatInt(int64(a2),10)
  fmt.Printf("T=%T,V=%q",str2,str2)
}
```

字符串转bool

```go
package main
import(
  "fmt"
  "strconv"
)
func main(){
  var str string = "true"
  var b bool
  // _ 表示忽略
  b,_ = strconv.ParseBool(str)
  fmt.Printf("b type %T b=%v",b,b)
}
```

派生/复杂数据类型：指针，数组、结构体(struct)、管道(Channel)、函数、切片(slice)，接口(interface)、map。

输出整型的地址。值类型，都有对应的指针类型，形式为*数据类型。值类型包括：int系列，float系列，bool，string，数组，结构体struct。引用类型：指针，slice切片，map，管道chan，interface等都是引用类型。

内存分为栈内存，堆内存。值类型通常存在栈内存，引用类型通常在堆内存分配空间，逃逸分析。

```go
package main
import "fmt"
func main(){
  var i int = 10
  fmt.Println("i的地址是",&i)  
}
```

## 标识符
标识符不能使用系统的保留关键字，比如break，if等。严格区分大小写；_只能用占位符，不能用标识符。包名 尽量与所在的文件夹保持一致。首字母大写就是公有的，首字母小写就是私有的变量。36个预定义标识符。

# 运算符

运算符：算术运算符，位运算符。运算符的优先级大致的顺序整理

* 括号，++，--
* 单目运算符 ! & *(指针的取值运算符)
* 算术运算符 + - * /
* 移位运算 >> <<
* 关系运算符 > < = >=
* 位运算符 &(按位与) |(按位或) ^(异或) <<(左移) >>(右移)
* 逻辑运算符 && ||
* 赋值运算符
* 逗号

其他运算符：*取指针变量的值，&返回变量存储的地址

```go
package main
import (
 "fmt"
)
func main(){
  var year int = 2013
  // 闰年 366天 2月份 29
  if year % 4 == 0 && year % 100 != 0 || year % 400 == 0 {
	  fmt.Println("该年份是闰年")
  }
}
```

反码，原码、补码

对于有符号的而言：

* 二进制的最高位是符号位：0表示正数，1表示负数
* 正数的原码，反码，补码都一样
* 负数的反码=它的原符号位不变，其他位取反
* 负数的补码=它的反码+1
* 0的反码，补码都是0
* 在计算机运算的时候，都是以补码的方式运算的

> 1 ===> 原码[0000 0001] 反码[0000 0001] 补码[0000 0001]  
> -1 ===>原码[1000 0001] 反码[1111 1110] 补码[1111 1111]
>

```go
package main
import "fmt"
func main(){
 // 2的补码 0000 0010 
 // 3的补码 0000 0011
 // 求与    0000 0010 同为1为1 否则为0 输出2
 fmt.Println(2&3)
 // 2的补码 0000 0010 
 // 3的补码 0000 0011
 // 求或    0000 0011 有1为1 否则为0 输出3
 fmt.Println(2|3)
 // 2的补码 0000 0010 
 // 3的补码 0000 0011
 // 求异或  0000 0001 不同为1 否则为0 输出1
 fmt.Println(2^3) 
 // 右移 低位溢出 符号位不变 并用符号位补溢出的高位
 // 左移 符号位不变 低位补0
 // 1的补码 0000 0001 右移2位 溢出 符号位不变 符号位补溢出 0000 0000
 // 1的补码 0000 0001 左移2位 符号位不变 低位补0 0000 0100
 a := 1 >> 2 // 0
 c := 1 << 2 // 4
 fmt.Println("a=",a,"c=",c)
}
```

获取用户的输入`fmt.Scanln()`或者`fmt.Scanf()`

```go
package main
import "fmt"
func main(){
  // 获取用户的输入 姓名 年龄 薪水 是否通过考试
  var name string
  var age byte
  var sal float32
  var isPass bool
  fmt.Println("请输入姓名")
  fmt.Scanln(&name)
  fmt.Println("请输入年龄")
  fmt.Scanln(&age)
  fmt.Println("请输入薪水")
  fmt.Scanln(&sal)
  fmt.Println("请输入是否通过考试")
  fmt.Scanln(&isPass)
  fmt.Printf("名字是 %v \n 年龄是 %v \n 薪水是 %v \n 是否通过考试 %v",name,age,sal,isPass)
}
```

# 流程控制

分支控制：if-else，允许在条件语句声明变量`if age := 20 ; age > 10 {}`。

```go
package main
import (
 "fmt"
)
func main(){
 var age byte
 fmt.Println("请输入你的年龄:")
 fmt.Scanln(&age)
 if age > 10 {
  fmt.Println("你应该为你的年龄负责")
 }else{
  fmt.Println("放过你了")
 }
}
```

```go
package main
import (
  "fmt"
  "math"
)
func main(){
  var a float64 = 3.0
  var b float64 = 100.0
  var c float64 = 6.0
  m := b * b - 4 * a * c
  if m > 0 {
	x1 := (-b + math.Sqrt(m)) / 2 * a
	x2 := (-b - math.Sqrt(m)) / 2 * a
	fmt.Printf("x1=%v,x2=%v",x1,x2)
  } else if m == 0 {
	x1 := (-b + math.Sqrt(m)) / 2 * a
	fmt.Printf("x1=%v",x1)
  } else {
	fmt.Println("无解")
  }
}
```

switch分支语句不用加break。

* 常量或者表达式或者函数
* 数据类型必须一致
* default不是必须的

```go
package main
import (
  "fmt"
)
func main(){
 var date int
 fmt.Println("请输入一个字符 a,b,c,d,e,f,g")
 fmt.Scanf("%c",&date)
 switch date {
   case 'a':
    fmt.Println("星期一")
   case 'b':
	fmt.Println("星期二")
   case 'C':
	fmt.Println("星期三")
   case 'd':
	fmt.Println("星期四")
   default :
    fmt.Println("未知")
 }
}
```

> switch穿透：fallthrought
>

具体是值使用switch，区间判断使用if-else

for循环输出

```go
package main
import (
  "fmt"
)
func main(){
  for i := 0; i <=10; i++{
    fmt.Println("hello world")
  }
  k := 1
  for {
    if k <= 10 {
      fmt.Println("come on zip")
    }else{
      break
    }
    k++
  }
  // 遍历字符串
  var str string = "hello world"
  for index,val := range str {
    fmt.Printf("index=%d,val=%c\n",index,val)
  }
}
```

使用for循环实现while和do...while循环。首先实现while循环：for循环是一个无限循环，break语句就是跳出循环。do...while至少执行一次。

多重循环：外层循环为m，内层循环为n，实际执行的循环为m * n层

如果break出现在多层嵌套语句块中，可以通过标签指明要终止的是哪一块的语句块

# 函数和包和方法

模块化编程，自定义函数，系统函数。完成某一功能的程序指令（语句）的集合称为函数。包的本质实际上就是创建的不同的文件夹，来存放程序文件。要记得配置环境变量GOPATH，路径从src下开始，不用带src，编译器会自动带上。可以给包取别名。`go build -o bin/my.exe main.go所在的文件夹路径`

函数也是一种数据类型，指向同一块的代码空间。Go语言支持多个返回值的返回。支持对函数返回值进行命名。使用_标识符（占位符），忽略返回值。

Go支持可变参数，例如支持0到多个参数`func sun(args... int) sum int{}`，支持1到多个参数`func sum(n int ,args... int) sum int{}`，args是slice切片，通过args[index]，可以访问到各个值。

> 为了简化数据类型定义。Go支持自定义数据类型  
> 基本语法：type 自定义数据类型名 数据类型 // 理解：相当于一个别名  
> eg：type integer int //这时integer就等价与int来使用了  
> JS函数内部有个arguments对象，适用于无法确定参数个数的情况。
>

## 函数的调用机制

* 在调用一个函数时，会给函数分配一个新的空间，编译器会通过自身的处理让这个新的空间和其他的栈的空间区分开来
* 在每个函数对应的栈中，数据空间是独立的，不会混淆
* 当一个函数调用完毕后，程序会销毁这个函数对应的栈空间

递归：一个函数体内有调用了本身，我们称为递归调用。匿名函数就是没有函数名的函数，可以将匿名函数赋给一个变量。init函数会在main函数之前执行，_表示私有。

闭包：返回是一个匿名函数，但是这个匿名函数引用到函数外的n，因此这个匿名函数就和n形成一个整体，就构成闭包。可以将闭包理解成一个类，用到的变量是类的属性，匿名方法就是操作属性的方法。

函数中的defer：延时执行。创建资源（比如：数据库链接，文件句柄，锁等），为了在函数执行完毕后，释放资源。当执行到defer时，暂时不执行，压入到一个defer栈中，当函数执行完毕后，再从defer栈，按照先入后出的方式出栈，执行。函数执行完毕后，在向后执行。值拷贝。在defer后，可以继续使用创建资源；

```go
var n int = 10
return func(x int) int {
  n = n + x
  return n
}
```

> 栈：先入后出
>

## 函数的传递方式

值传递，引用传递

> 其实不管是值传递还是引用传递，传递给函数的都是变量的副本，不同的是，值传递的是值的拷贝，引用的是地址的拷贝，一般来说，地址拷贝效率高，因为数据量小，而值拷贝决定拷贝的数据大小，数据越大，效率越低
>

## 内置函数

### 字符串中常用的函数

1. 统计字符串的长度，按字节len(str)
2. 字符串遍历，同时处理有中文的问题r:=[]rune(str)
3. 字符串转整数：n,err := strconv.Atoi("12")
4. 整数转字符串 str = strconv.Itoa(123456)
5. 字符串转[]bety var bytes = []byte("hello go")
6. []byte转字符串：str = string([]byte{97,98,99})
7. 10进制转2，8，16进制：str = strconv.FormatInt(123,2)//2->8,16
8. 查询子串是否在指定字符串中：strings.Contains("seafood","e") //true
9. 统计一个字符串 有几个指定的子串：strings.Count("ceheese","e") //4
10. 不区分大小写的字符串比较(**==是区分字母大小写的**)：fmt.Println(strings.EqualFold("abc","Abc"))
11. 返回子串在字符第一次出现的index值，如果没有返回-1：strings.Index("NLT_abc","abc")//4
12. 将string数组的元素按指定的字符串拼接起来，strings.Join(s,"")//s是一个字符串数组
13. 返回子串在字符串最后一次出现的index值，如果没有返回-1：strings.LastIndex("go gopher","go")
14. 将指定的子串替换成另外一个子串：strings.Replace("oink oink oink","k","ky",n)n可以指定替换的个数，如果n=-1表示全部替换
15. 按照指定的某个字符，为分割标识，将一个字符串拆分分字符串数组：strings.Split("hello,world,ok",",")
16. 将字符串的字母进行大小写的转换:`strings.ToLower("Go")//go` `strings.ToUpper("Go")//GO`
17. 将字符串左右两边的空格去掉：strings.TrimSpace("  tom say hello ")
18. 将字符串左右两边指定的字符去掉：strings.Trim("! hello !"," !")
19. 将字符串左边指定字符去掉：strings.TrimLeft("! hello !"," !")
20. 将字符串右边指定字符去掉：strings.TrimRight"! hello !"," !")
21. 判断字符串是否以指定的字符串开头：strings.HasPerfix("ftp://192.168.1.1","ftp")
22. 判断字符串是否以指定的字符串结束：strings.HasStuffix("NLT_abc.jpg","abc")//false

### 日期和时间相关函数

* time.Time类型，用于表示时间
* 获取当前时间的方法：now := time.Now() //now的类型就是time.Time
* 格式化日期和时间
* 时间的常量  
  const {  
  Nanosecond Duration = 1  
  Microsecond  = 1000 * Nanosecond  
  Millisecond = 1000 * Microsecond // 毫秒  
  Second = 1000 * Millisecond  
  Minute = 60 * Second  
  Hour = 60 * Minute  
  }
* 休眠 `func Sleep(d Duration)`案例：`time.Sleep(100 * time.Millisecond)`
* 获取当前Unix方法时间戳和UnixNao方法时间戳。（作用是 可以获取随机数字）  
  Unix将t表示为Unix时间，即从时间点January 1 ，1970 UTC到当前时间点所经过的时间（单位秒）

```go
package main
import (
	"fmt"
	"time"
)
func main(){
	now := time.Now() // 工厂函数
	fmt.Printf("now = %v,type = %T\n",now,now)
	fmt.Printf("年=%v\n",now.Year())
	fmt.Printf("月=%v\n",int(now.Month()))
	fmt.Printf("日=%v\n",now.Day())
	fmt.Printf("时=%v\n",now.Hour())
	fmt.Printf("分=%v\n",now.Minute())
	fmt.Printf("秒=%v\n",now.Second())

	// 格式化输出
	fmt.Printf("当前年月日 %02d-%02d-%02d %02d:%02d:%02d\n",now.Year(),
  now.Month(),now.Day(),now.Hour(),now.Minute(),now.Second())

	dateStr := fmt.Sprintf("当前年月日 %02d-%02d-%02d %02d:%02d:%02d\n",now.Year(),
  now.Month(),now.Day(),now.Hour(),now.Minute(),now.Second())
	fmt.Printf("%v\n",dateStr)

	fmt.Printf(now.Format("2006/01/02 15:04:05"))
	//fmt.Printf(now.Format(time.ANSIC))
}
```

# 数组和切片

## 数组array

引出数值：传统的方法不利于数据的管理和维护。不够灵活，因此需要使用新的数据类型。数组定义：可以存放多个同一类型数据，在Go中，数组是值类型。定义一个数组`var hens [6]float64`。数组的地址是下标为0的地址，其他下标的地址是依次等于加上数据类型的字节数。int64是8字节。获取数组的长度`len(hens)`。通过`&hens`获取数组的地址，与`&hans[0]`一样。可以使用for-range方式遍历。

数组的声明`var arr [5]int`

初始化数组的四种方式

```go
package main
import (
	"fmt"
)
func main(){
	var numArray01 [3]int = [3]int{1,2,3}
	var numArray02  = [3]int{1,2,3} // 类型推导
	var numArray03  = [...]int{1,2,3}
	var names = [3]string{1:"tom",0:"jack",2:"marry"}
	fmt.Println(numArray01)
	fmt.Println(numArray02)
	fmt.Println(numArray03)
	fmt.Println(names)
}
```

数组的使用细节如下：

* 数组是多个相同数据类型的组合，一个数组一旦声明，其长度是固定的，不能动态变化
* var arr []int 这时arr就是一个slice切片
* 数组的元素可以是任何数据类型，包括值类型和引用类型，但是不能混用
* 数组下标必须在指定范围内使用，否则报panic，数组越界
* 数组是值类型，默认进行值拷贝
* 如果在其他函数中，去修改原来的数组，可以使用引用传递
* 长度是数组类型的一部分，在传递数组时，要考虑长度

## 切片slice

动态数组。了解切片的内存布局示意图。slice是一个 引用类型，可以理解是一个数据结构(struct结构体)。可以使用make创建切片。结构体的第一个属性指向数组，第二个为len，第三个为cap，所有的内置函数[builtin](http://docscn.studygolang.com/pkg/builtin/)。数组对外不可见，是由make底层维护。只能通过slice

使用切片的三种方式

* 定义一个切片，然后让切片去引用一个已经创建好的数组
* 通过make来创建切片，基本语法：var 切片名 []type = make([]type,len,[cap])参数说明，type就是数据类型 len：大小 cap：指定切片容量，可选
* 定义一个切片，直接就指定具体数组，使用原理类似make的方式 var slice []int = []int{1,2,3}，触发扩容机制

切片的遍历for-range

使用切片的细节：

1. 切片的初始化方式一 var slice = arr[startIndex:endIndex]
2. 切片初始化时，仍然不能越界。范围在0-len(slice)之间，但是可以动态增长  
    1)var slice = arr[0:end]可以简写var slice = arr[:end]  
    2)var slice = arr[start:len(arr)]可以简写：var slice = arr[start:]  
    3)var slice = arr[0:len(arr)]可以简写：var slice = arr[:]
3. cap是一个内置函数，用于统计切片的容量
4. 切片定义完后，还不能使用，因为本身一个空的，需要让其引用到一个数组或者make一个空间供切片使用
5. 切片可以继续切片
6. 使用append内置函数，可以对切片进行动态追加  
    切片append操作底层原理分析：  
    1.切片append操作的本质就是对数组扩容  
    2.go底层会创建一个新的数组newArr（安装扩容后大小）  
    3.将slice原来包含的元素拷贝到新的数组newArr  
    4.将slice重新引用到newArr  
    5.注意newArr是在底层维护的，程序员不可见
7. 切片使用copy内置函数完成拷贝  
    1.copy(para1,para2)参数的数据类型是切片  
    2.数据空间是独立，互相不影响
8. 关于拷贝的细节
9. 切片是引用类型，所以在传递时，遵循引用传递机制。

string和slice的关系

* string底层是一个byte数组，因此string也可以进行切片处理
* string是不可变的，也就是说不能通过str[0] = 'z'的方式修改字符串
* 如果需要修改字符串，可以先将string->[]byte / []rune->重写改成string

# 排序和查找

排序是将一组数据，依指定的顺序进行排列的过程。

> 1.内部排序：  
> 将需要处理的所有数据都加载到内部存储器中进行排序（交换式排序法，选择式排序法，插入式排序法）  
> 2.外部排序：  
> 数据量大，无法全部加载到内存中，需要借助外部存储进行排序，包括（合并排序法，直接合并排序法）
>

交换式排序法：冒泡排序，快速排序

冒泡排序的规则：

1. 一共会经过arr.length-1次的轮数比较，每一次将会确定一个数的位置
2. 每一轮的比较次数再逐渐减少【4，3，2，1】
3. 当发现前面的一个数比后面的一个数大的时候，就进行交换

查找：顺序查找，二分查找

* arr是一个有序数组，并且从小到大排序
* 先找到中间的下标，middle = (leftIndex + rightIndex) / 2，然后中间下标的值和findVal进行比较  
  1.如果arr[middle] > findVal，就应该想leftIndex到middle-1之间查找  
  2.如果arr[middle] < findVal，就应该想middle+1到rightIndex之间查找  
  3.如果arr[middle]==findVal，就找到  
  4.上面的2.1，2.2，2.3的逻辑会递归执行
* 如果leftIndex > rightIndex就说明退出

## 二维数组

声明，定义，再赋值：

语法：var 数组名 [大小][大小]类型  
比如：var arr [2][3]int，再赋值  
内存中的存在形式

直接初始化：

声明：var 数组名 [大小][大小]类型 = [大小][大小]类型{{初值...},{初值...}}  
赋值（有默认值，比如int类型就是0）

# 映射map

介绍：map是key-value数据结构，又称为字段或者关联数组。类似其他编程语言的集合。

map的声明：var map变量名 map[keytype]valyetype  
key可以是什么类型，通常为int，string。golang中的map的key可以是多种类型，比如bool，数字，string，指针，channel，还可以是只包含前面类型的接口，结构体，数组。

> 注意：slice,map,还有function不可以，因为这几个没发用==来判断
>

valuetype可以是什么类型：数字，字符串，结构体，map。map的使用

```go
package main
import (
	"fmt"
)
func main(){
	// fmt.Println("hello,world!")
	var a map[string]string
	a = make(map[string]string,10)
	a["no1"] = "宋江"
	a["no2"] = "无用"
	a["no1"] = "武松"
	a["no3"] = "宋江"
	fmt.Println(a)
	// 方式二
	cities := make(map[string]string)
	cities["no1"] = "北京"
	cities["no2"] = "上海"
	fmt.Println(cities)
	//方式三
	var heroes map[string]string = map[string]string{
		"hero1":"宋江",
		"hero2":"卢俊义",
	}
	fmt.Println(heroes)
}
```

map的增删改查的操作。如果key存在，就是修改。如果key不存在，就是添加。map的删除：delete(map,'key')，delete是一个内置函数，如果key存在，就删除，如果key不存在，不操作，也不会报错。可以使用for-range的结构遍历。

```go
package main
import (
	"fmt"
)
func main(){
	// 方式二
	cities := make(map[string]string)
	cities["no1"] = "北京"
	cities["no2"] = "上海"
	cities["no3"] = "天津"
	for k,v := range cities{
		fmt.Printf("k = %v,v = %v \n",k,v)
	}

	studentMap := make(map[string]map[string]string)
	studentMap["stu01"] = make(map[string]string,3)
	studentMap["stu01"]["name"] = "tom"
	studentMap["stu01"]["sex"] = "男"
	studentMap["stu01"]["address"] = "北京长安"

	studentMap["stu02"] = make(map[string]string,3)
	studentMap["stu02"]["name"] = "mary"
	studentMap["stu02"]["sex"] = "女"
	studentMap["stu02"]["address"] = "上海"

	for k1,v1 := range studentMap {
		fmt.Println("k1=",k1)
		for k2,v2 := range v1{
			fmt.Printf("\t k2=%v,v2=%v\n",k2,v2)
		}
		fmt.Println()
	}

}
```

map切片

```go
package main
import (
	"fmt"
)
func main(){
	// fmt.Println("hello,world!")
	var monsters []map[string]string
	monsters = make([]map[string]string,2)
	if monsters[0] == nil {
		monsters[0] = make(map[string]string,2)
		monsters[0]["name"] = "牛魔王"
		monsters[0]["age"] = "500"
	}
	if monsters[1] == nil {
		monsters[1] = make(map[string]string,2)
		monsters[1]["name"] = "玉兔精"
		monsters[1]["age"] = "400"
	}
	// 1.先定义map
	newMonster := map[string]string{
		"name":"新妖怪火云邪神",
		"age":"200",
	}
	monsters = append(monsters,newMonster)
	fmt.Println(monsters)
}
```

golang没有一个专门的方法针对map的key进行排序，key是无序的  
golang中的map默认是无序的，也不是按照添加的顺序存放的  
先将map的key放到切片中 对切片遍历 然后按照key来输出map的值

map的使用细节

* map是引用类型的数据，遵循引用类型传递的机制，如果一个函数接受map，修改后，会修改原来的map
* map的容量达到后，再想map增加元素，会自动扩容，并不会发生panic，也就是说map能动态的增长键值对。
* map的value也经常使用struct类型，更适合管理复杂的数据（比前面value是个map更好），比如value为Student结构体

# 面向对象编程

面向对象的思想抽象：定义结构体的时候，实际上就是把一类事物的共有的属性和行为提取出来，形成一个物理模型，这种研究问题的方式称为抽象。

> 1 Go支持面向对象编程的特性  
> 2 Golang没有类（class），结构体与class有同等的地位，  
> 3 去掉了传统的继承，方法重载，构造函数，析构函数，隐藏的this指针。
>

* 封装：就是把抽象出来的字段和对字段的操作封装在一起，数据被保护在内部（全部为小写），程序的其他包通过被授权的操作（方法），才能对字段进行操作，提供工厂函数。隐藏实现细节可以对数据进行验证，保证安全合理。
* 继承：代码复用和可维护性
* 多态：函数定义一个接口类型的变量，就可以接受多个类型的实参。重载和重写，不固定类型传参。基本介绍：变量（实例）具有多种形态。多态参数以及多态数组就是多态的体现形式。

## 结构体struct

结构体是自定义的数据类型，代表一类事物；结构体变量（实例）是具体的，实际的，代表一个具体变量。在内存中是值类型的存储方式。可以同过&取到地址。直接指向`数据空间`，而不是指向一个地址。默认情况下，值拷贝。

* 创建一个结构体变量后，如果没有给字段赋值，都有对应的默认值。
* 不同结构体变量的字段都是独立的，互不影响，一个结构体变量的字段的更改，不影响另外一个。

声明结构体的四种方式

```go
package main
import "fmt"
type Person struct{
	Name string
	Age int
}
func main(){
        //var stu Student
        //var stu Student = Student{}
        //var stu = Student{}
        stu := Person{"mary",20}
	fmt.Println(stu)
	//方式3
	var p3 *Person = new(Person) // 返回
	//(*p3).Name = "smith" 等价于 p3.Name = "smith" 
	// 原因：go的设计者，为了程序员的使用，底层会对p3.Name = "smith" 进行处理
	// 会给 p3 加上取值运算 (*p3).Name = "smith"
	(*p3).Name = "smith"
	(*p3).Age = 30
	p3.Age = 100
	fmt.Println(*p3)
	// 方式4
	var person *Person = &Person{"mary",60}
	//因为person 是一个指针 因此标准的访问字段的方法 必须加上取值运算
	(*person).Name = "scott"
	person.Name = "scot--"
	fmt.Println(person)

```

> 方式3，4返回的是结构体指针，底层做了指针的取值运算。结构体中的所有字段在内存中是连续的
>

1.结构体是用户单独定义的类型，和其他类型进行转换时需要完全相同的字段  
2.结构体进行type重新定义（相当于取别名），Golang认为是新的数据类型，但是可以互相间强转  
3.struct的每个字段上，可以写上一个tag，该tag可以通过反射机制获取，常见的场景就是序列化和反序列化。

## 方法

Golang中方法是作用在指定的数据类型上的（即：和指定的数据类型绑定），因此自定义类型，都可以有方法，而不仅仅是struct [JS构造函数](https://www.bilibili.com/read/cv9052704)

> 1.test方法和Person类型绑定  
> 2.test方法只能通过Person类型的变量类调用，而不能直接调用，也不能使用其他类型的变量调用  
> 3.func(p Person) test(){} ...p表示那个Person调用，这个p就是它的副本，这点和函数传参非常相似
>

方法可以跟函数一样进行各种运算。方法调用和传参机制原理：方法的调用和传参机制基本一样，不一样的地方是方法调用时，会将调用方法的变量，当做实参也传递给方法

* 结构体类型是值类型，在方法调用中，遵守值类型的传递机制，是值拷贝传递方式
* 如果想在方法中修改结构体变量的值，可以通过结构体指针的方式来处理
* Golang中方法作用在指定的数据类型上的（即：和指定的数据类型绑定）

# 接口interface

Go语言面向对象中的多态是通过接口实现的。高内聚，低耦合（只定义方法，不实现，没有方法体）。提高代码的通用性。

基本介绍：interface类型可以定义一组方法，但是这些不需要实现。并且interface不能包含任何变量。到某个自定义类型（比如结构体Phone）要使用的时候，在根据具体情况把这些方法实现。规范化开发。

* 接口本身不能创建实例，但是可以指向（接收）一个实现了该接口自定义类型的变量（实例）。里氏代换原则
* 接口中所有的方法都没有方法体
* 自定义类型实现了某个接口的所有方法，我们才说实现了该接口
* 只要是自定义类型数据，都可以实现接口，而不仅仅是结构体类型
* 自定义类型可以实现多个接口
* Golang不能有任何变量
* 一个接口可以继承多个别的接口，但是这时候实现A接口，就得把继承来的接口方法全部实现
* interface类型默认是一个指针（引用类型），如果没有对interface初始化，就会输出nil
* 空接口`interface{}`就是一种数据类型，没有任何方法，所有的类型都实现了空接口

> 开放接口，内部实现。接口和继承的关系，可以看作是对继承的补充。  
> 接口的价值：设计，设计好各种规范（方法），让其他自定义类型去实现这些方法。
>

# 类型断言

由于接口是一般类型，不知道具体类型，如果转成具体类型，就需要使用类型断言。

```go
package main
import (
	"fmt"
)
type Point struct {
	x int
	y int
}
func main(){
	// fmt.Println("hello,world!")
	var a interface {}
	var point Point = Point{1,2}
	a = point
	var b Point
	b,flag = a.(Point)
	fmt.Println(b)
}
```

# 软件设计

需求分析(30%)->设计阶段(20%)->实现阶段(代码)->测试阶段->实施阶段->维护阶段

# 文件操作

文件是数据源（保存数据的地方）的一种，比如word文档，txt文件，excel文件，文件的主要作用就是保存数据。文件在程序中是以流的形式来操作的。

流：数据在数据源（文件）和程序（内存）之间经历的路径。输入流：数据从数据源（文件）到程序（内存）的路径；输出流：数据从程序（内存）到数据源（文件）的路径。文件是一个指针类型。os.File封装了所有的文件相关操作，File是一个结构体

## 文件读取

Open打开一个文件用于读取，如果操作成功，返回文件对象的方法可以用于读取数据；对应的文件具有O_RDONLY模式。如果出错，错误底层的类型是*PathError。

```go
package main
import (
	"fmt"
	"os"
)
func main(){
	// fmt.Println("hello,world!")
	// 1. file 叫file对象
	// 2. file 叫file指针
        // 3. file 叫file文件句柄
	file,err := os.Open("C:/Users/fangziping/Downloads/nuxt-rss.jpg")
	if err != nil {
		fmt.Println("open file err=",err)
	}
	// 输出下文件 看看文件是什么
	fmt.Printf("file=%v",file)
	//关闭文件
	err = file.Close()
	if err != nil {
		fmt.Println("close file err = ",err)
	}
```

文件的读取：读取文件的内容并显示在终端（带缓冲区的方式），使用os.Open，file.Close，bufio.NewReader()，reader.ReadString函数和方法

```go
package main
import (
	"fmt"
	"os"
	"bufio"
	"io"
)
func main(){
	// fmt.Println("hello,world!")
	// 1. file 叫file对象
	// 2. file 叫file指针
        // 3. file 叫file文件句柄
	file,err := os.Open("C:/Users/fangziping/Downloads/go-file-demo.txt")
	if err != nil {
		fmt.Println("open file err=",err)
	}

	defer file.Close() // 不关闭 会导致内存泄漏

        // 创建一个 *Reader 是带缓冲的
	reader := bufio.NewReader(file)
	for {
		str,err := reader.ReadString('\n') // 读到一个换行就结束
		if err == io.EOF {
			// fmt.Println("")
			break
		}
		fmt.Print(str)
	}
	fmt.Println("文件读取结束")
}
```

读取文件的内容并显示到终端（使用ioutil一次将整个文件读到内存中），这种方式适用于文件不大的情况。相关的方法和函数（ioutil.ReadFile）

```go
package main
import (
	"fmt"
	"io/ioutil"
)
func main(){
	file := "C:/Users/fangziping/Downloads/go-file-demo.txt"
	content,err := ioutil.ReadFile(file)
	if err != nil {
		fmt.Printf("read file err=%v",err)
	}
	// 把读取的内容显示到终端
	fmt.Printf("%v",string(content)) // []byte 切片
}
```

## 文件写入

func OpenFile(name string,flag int,perm FileMode) (file *File,err error)

> os.OpenFile是一个一般性的文件打开函数，它会使用指定的选项（如，O_RDONLY），指定的模式打开指定名称的文件。如果操作成功，返回的文件对象可以用于 I/O。如果错误 ，错误底层类型是*PathError
>

使用os.OpenFile(),bufio.NewWriter()。*Writer的方法WriterString完成任务

```go
package main
import (
	"fmt"
	"bufio"
	"os"
)
func main(){
	// fmt.Println("hello,world!")
	filePath := "d:/adb.txt"
	file,err := os.OpenFile(filePath,os.O_CREATE | os.O_WRONLY , 0666)
	if err != nil {
		fmt.Printf("open file err=%v\n",err)
		return
	}
	defer file.Close()
	str := "hello,Gardon\n"
	writer := bufio.NewWriter(file)
	for i := 0; i<5; i++{
		writer.WriteString(str)
	}
	// 因为writer是带缓存的 
	writer.Flush()
}
```

将一张图片（二进制文件）拷贝到另外一个目录下去。golang判断文件是否存在的方法为使用os.Stat()函数返回的错误值进行判断。os包中有Copy的方法

```go
package main
import (
	"fmt"
	_ "io/ioutil"
	"os"
	"bufio"
	"io"
)
func CopyFile(dstFileName string, srcFileName string) (written int64,err error){
	srcfile,err := os.Open(srcFileName)
	if err != nil {
		fmt.Printf("open fild err=%v\n",err)
	}
	defer srcfile.Close()
	reader := bufio.NewReader(srcfile)
	destfile,err := os.OpenFile(dstFileName,os.O_WRONLY | os.O_CREATE, 0666)
	if err != nil {
		fmt.Printf("open file err=%v\n",err)
		return
	}
	writer := bufio.NewWriter(destfile)
	defer destfile.Close()
	return io.Copy(writer,reader)
}
func main(){
	fmt.Println("hello,world!")
	srcFile := "C:/Users/fangziping/Downloads/nuxt-rss.jpg"
	dstFile := "D:/nuxt-rss.jpg"
	_,err := CopyFile(dstFile,srcFile)
	if err == nil {
		fmt.Println("拷贝完成")
	}else{
		fmt.Printf("open file err=%v\n",err)
	}
}
```

## 命令行参数

os.Args是一个string的切片，用来存储所有的命令行参数。可以使用flag包解析参数，参数顺序可以随意。

```go
package main
import (
	"fmt"
	"flag"
)
func main(){
	fmt.Println("hello,world!")
	var user string
	var pwd string
	var host string
	var port int
	// 用户名 -u 默认值 说明
	flag.StringVar(&user,"u","","用户名,默认为空") 
	flag.StringVar(&pwd,"pwd","","密码,默认为空") 
	flag.StringVar(&host,"h","locahost","主机名,默认localhost") 
	flag.IntVar(&port,"port",3306,"端口号,默认3306") 
	flag.Parse()
	fmt.Printf("user=%v,pwd=%v,host=%v,port=%v",user,pwd,host,port)

}
```

## json的基本介绍

JSON(JavaScript Object Notation)是一种轻量级的数据交换格式。JSON易于机器解析，并有效的提升网络传输效率。通常程序中在网络传输是先将数据（结构体，map等）序列化成json字符串，到接受方得到json字符串时，反序列化成原来的数据类型（结构体，map等）。任何数据类型都可以通过JSON表示

```go
package main
import (
	"fmt"
	"encoding/json"
)
type Monster struct {
	Name string `json:"name"`
	Age int `json:"age"`
	Birthday string
	Sal float64
	Skill string
}
func testStruct(){
	var monster = Monster{
		Name:"牛魔王" ,
		Age:500 ,
		Birthday : "2011-11-10",
		Sal : 8000.0,
		Skill : "牛拳",
	}
	data,err := json.Marshal(&monster)
	if err != nil {
		fmt.Printf("序列化错误 err=%v\n",err)
	}
	fmt.Printf("monster序列化后%v\n",string(data))
}

type A interface{}

func testMap(){
	var a map[string]A
	a = make(map[string]A)
	a["name"] = "红孩儿"
	a["age"] = 30
	a["address"] = "红岩洞"
	data,err := json.Marshal(a)
	if err != nil {
		fmt.Printf("序列化错误 err=%v\n",err)
	}
	fmt.Printf("monster序列化后%v\n",string(data))
}

func testSlice(){
	var slice []map[string]A
	var m1 = make(map[string]A)
	m1["name"] = "jack"
	m1["age"] = 7
	m1["address"] = "北京"
	slice = append(slice,m1)
	var m2 = make(map[string]A)
	m2["name"] = "tom"
	m2["age"] = 20
	m2["address"] = [2]string{"墨西哥","夏威夷"}
	slice = append(slice,m2)
	data,err := json.Marshal(slice)
	if err != nil {
		fmt.Printf("序列化错误 err=%v\n",err)
	}
	fmt.Printf("monster序列化后%v\n",string(data))
}
func testFloat64(){
	var num float64 = 12345.1
	data,err := json.Marshal(num)
	if err != nil {
		fmt.Printf("序列化错误 err=%v\n",err)
	}
	fmt.Printf("monster序列化后%v\n",string(data))
}
func main(){
	testStruct()
}
```

# 单元测试

引出单元测试：在工作中，需要去确认一个函数个一个模块的结果是否正确。传统方式，在main函数中，调用addUpper函数，看看实际输出的结果是否和预期的结果一致，如果一致，则说明函数正确，否则函数有错误，然后修改。

传统方式的缺点

* 不方便，我们需要在函数中调用，这样就需要去修改mian函数，如果现在项目正在运行，就可能去停止项目
* 不利于管理，因为我们测试多个函数或者多个模块时，都需要写在main函数，不利于我们管理
* 引出单元测试。testing测试框架，可以解决问题

Go语言中自带有一个轻量级的测试框架testing和自带的go test命令来实现 单元测试和性能测试，testing框架和其他语言测试框架类似，可以基于这个框架写针对相应函数的测试用例，也可以写相应的压力测试用例。解决的问题

* 确保每个函数是可运行的，并且结果正确
* 代码性能好
* 单元测试能及时的发现程序或者实现的逻辑错误，是问题及早暴露，便于问题的定位，让程序在高并发的情况下可以运行。

切换到cal_test.go的文件目录下执行`go test -v`基本原理和代码示例

单元测试的细节

* 测试用例文件名必须以xxx_test.go结尾。比如cal_test.go，cal不固定
* 测试用例函数必须以Test开头，一般就是Test+被测试的函数名，比如TestAddUpper
* TestAddUpper的形参类型必须是*testing.T
* 一个测试用例文件，可以有多个测试用例函数
* 运行指令`go test` 正确无日志，错误有日志。`go test -v`运行正确错误，都有日志
* 当出现错误时，可以使用t.Fatalf来格式化输出错误信息，并退出程序
* t.Logf方法可以输出相应的日志
* 测试用例函数，并没有放在main函数中，有testing框架底层完成
* PASS表示测试用例运行成功，FAIL表示测试用例运行失败
* 测试单个文件，一定要带上被测试的源文件 `go test -v cal_test.go cal.go`
* 测试单个方法`go test -v -test.run TestAddUpper`

# goroutine协程和channel管道

引出：要求统1-20000的数字中，哪些是素数？

> 1传统思路：使用一个循环，循环的判断各个数是不是素数  
> 2使用并发或者并行的方式，将统计素数的任务分配给过个goroutine去完成，这个时候就会使用到goroutine。
>

进程和线程的说明

* 进程就是程序在操作系统中的一次执行过程，是系统进行资源分配和调度的基本单位
* 线程是进程的一个执行实例，是程序最小的执行单元，它是比进程更小的能独立运行的基本单位
* 一个进程可以创建和销毁多个线程，同一个进程中的对个线程可以并发执行
* 一个程序至少有一个进程，一个进程至少一个线程

并发和并行

* 多线程程序在单核上运行，就是并发
* 多线程程序在多核上运行，就是并行

> 并发：因为在一个cpu上，比如有10个线程，每个线程执行10mm（进行轮询操作），从人的角度，好像这10个线程都在运行，但是从微观上看，在某个时间，其实只有一个线程在执行，这就是并发  
> 并行：因为是在多个cpu上（比如10个cpu），比如有10个线程，每个线程执行10mm（各自在不同的cpu上执行），从人的角度，这10个线程都在运行，但是从微观上看，在某一个时间点，也同时有10个线程在执行
>

## Go协程和Go主线程

Go主线程（也可以说是线程或者理解为进程）：一个Go程序，可以起多个协程，可以理解协程是轻量级的线程（编译器做了优化）。进程有操作系统控制。协程的特点：MPG模型

* 有独立的栈空间
* 共享程序堆空间
* 调度由用户控制
* 协程是轻量级的线程

## channel管道

使用全局变量加锁同步解决goroutine的通讯，但不完美

* 主线程在等待所有的goroutine全部完成的时间很难确定，设置了10s，仅仅是估算
* 如果主线程休眠时间长了。会加长等待时间，如果等待时间短了，可能还有goroutine处于工作状态，这时也会随主线程的退出而销毁
* 通过全局变量加锁同步来实现通讯，也不利于多个协程对全局变量的读写操作
* 因此可以使用新的通讯机制channel解决

channel本质就是一种数据结构-队列  
数据是先进先出【FIFO，first in first out】  
线程安全，多goroutine访问时，不需要加锁，就是说channel本身是线程安全的  
channel时有类型的，一个string的channel只能存放string类型的数据

声明/定义：var 变量名 chan 数据类型

> channel是引用类型  
> channel必须初始化才能写入数据，即make后才能使用  
> 管道是用类型的，intChan只能写入整数int
>

```go
package main
import (
	"fmt"
)
func main(){
	//演示管道的使用
	var intChan chan int
	intChan = make(chan int,3)
	fmt.Printf("intChan 的值=%v intChan本身的地址=%p \n",intChan,&intChan)
	intChan<- 10
	num := 122
	intChan<- num
	intChan<- 80
	fmt.Printf("channel len=%v cap=%v \n",len(intChan),cap(intChan))
	var num2 int
	num2 = <- intChan
	fmt.Println(num2)
	fmt.Printf("channel len=%v cap=%v \n",len(intChan),cap(intChan))
}
```

goroutine和管道配合求素数的需求

```go
package main
import (
	"fmt"
	"time"
)
// 使用goroutine和channel计算1-200000的素数有哪些

// 定义一个协程存放1-200000的数据
func pullNum(intChann chan int){
	for i := 1; i <= 80000; i++{
		intChann <- i
	} 
	close(intChann)
}
// 开启四个协程 判断是否为素数
func primeJudge(intChann chan int,primeChann chan int,exitChann chan bool){
	for {
		num,ok := <- intChann
		flag := true
		if !ok {
			break
		}
		for i := 2; i<num; i++ {
			if num % i == 0{
				flag = false
				break
			}
		}
		if flag {
			primeChann <- num
		}
	}
	fmt.Println("有一个primeJudge 协程因为取不到数据 退出")
	exitChann <- true
}
func main(){
	var intChann chan int
	intChann = make(chan int,1000)
	primeChann := make(chan int,200000)
	exitChann := make(chan bool ,4)
	start := time.Now().Unix()
	go pullNum(intChann)
	// 开启四个协程
	for i := 0; i < 4; i++ {
		go primeJudge(intChann,primeChann,exitChann)
	}

	go func(){ // 线程阻塞
		for i := 0; i < 4; i++{
			<- exitChann
		}
		end := time.Now().Unix()
		fmt.Println("使用协程耗时=",end - start)
		close(primeChann) // 不关闭 会造成死锁
	}()

	// 读取结果
	for {
		_,ok := <- primeChann
		if !ok {
			break
		}
		// fmt.Println("素数是",num)
	}
	fmt.Println("主线程退出")
}

```

# 反射

* 反射可以在运行时动态的获取变量的各种信息，比如变量的类型（type），类别（kind）
* 如果是结构体变量，可以获得结构体本身的信息（字段，方法）。
* 通过反射可修改变量的值，可以调用关联的方法。

反射使用的场景：结构体标签的应用，序列化与反序列化。函数的适配器。需要引用`reflect`包。空接口`interface{}`可以接受任意类型。reflect.Type是一个接口，reflect.Value是个结构体。kind本质是一个常量。

```go
// 专门用户做反射的函数
func test(b interface{}){
  // 1 如果将Interface{}转成reflect.Value
  rVal := reflect.ValueOf(b)
  // 2 如何将reflect.Value -> interface{}
  iVal := rVal.Interface()
  // 3 如何将interface{}转成原来的变量类型，使用类型断言
  v := iVal.(Stu) // Stu为结构体类型
}
```

> 常量必须初始化，不能修改；常量只能修饰bool，数值类型，string类型
>

# 网络编程

Golang的主要设计目标就是面向大规模后端服务程序，网络通信这块是服务端程序必不可少的也是至关重要的一部分。网络编程分为两种：

> TCP socket（套接字）编程，是网络编程的主流。底层是基于tcp/ip协议的。  
> b/s结构的http编程，我们使用浏览器去访问服务端时，使用的就是http协议，而http底层依旧是用tcp socket实现的。超文本传输协议
>

协议（tcp/ip）

tcp/ip（transmission control protocol/internet protocol）的简写，中文译名传输控制协议/因特网互联协议，又叫网络通讯协议。是有网络层的ip协议和传输层的tcp协议组成的

应用层：smtp，ftp，telnet，http；传输层：解释数据；网络层：ip定位ip地址和确定连接路径；链路层：link与硬件驱动对话。`tracert www.baidu.com` tcp/ip->网卡->网关->路由->网关->网卡->tcp/ip

ip：每个主机上的主机和路由器都有一个ip地址，它包括网络号和主机号，ip地址有ipv4（32位）和ipv6（128）位

端口：端口不是物理意义上的，而是特指tcp/ip协议中的端口，是逻辑上的意义`netstat -an`

> 0是固定端口；1-1024是固定端口；1025-65535是动态端口
>

测试连接的流程：`telnet www.baidu.com 80`->ctrl + ]退出->quit

```go
package main
import (
	"fmt"
	"net"
)
func main(){
	fmt.Println("服务器开始监听")
	listen,err := net.Listen("tcp","127.0.0.1:8888")
	if err != nil {
		fmt.Println("listen err = ",err)
		return
	}
	defer listen.Close() // 延时关闭
	fmt.Printf("listen suc = %v \n",listen)
	for {
		fmt.Println("等待客户端来连接...")
		conn,err := listen.Accept() // 等待客户端链接
		if err != nil {
			fmt.Println("Accept() err = ",err)
		}else {
			fmt.Printf("Accept() suc con = %v\n",conn)
		}
		// 这里准备起一个协程，为客户端服务
	}
}
```

# 碰到的问题

github进不去，配置host的解析`140.82.114.3 github.com`  
关掉模块管理`go env -w GO111MODULE=of` 或者使用相对路径引入自定义包  
打开windows中的telnet程序  
端口被占用：`netstat -aon | findstr :8888`
